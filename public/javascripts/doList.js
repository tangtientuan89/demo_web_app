//get data
$(document).ready(function() {
  let type = document.cookie.split("=")[2];
  if (type == 1) {
    return $(".admin").html(
      '<a href="/admin"><button class="btn-admin" id="btn-admin">Admin</button></a>'
    );
  }
});

// var currentPage;
let doListStatus = "off";
function loadPageWithoutChangePage() {
  let fragment = window.location.hash;
  let curPage = fragment.substring(fragment.indexOf("-") + 1);
  refreshPages(curPage);
}
loadPageWithoutChangePage();

function dataDB(pagesNum) {
  let search = $("#search").val();
  console.log(search);
  $.ajax({
    type: "GET",
    url: "/api/do-list/?pages=" + pagesNum + "&search=" + search
  }).then(function(data) {
    console.log(data.data);
    $("#data").html("");
    data.data.forEach(element => {
      $("#data").append(`
                <div class="d-flex row">
                    <h5 class="dolistTitle col-4 text-light" onClick="btnView('${element.title}','${element.content}')">${element.title}</h5>
                    <div class="dolistContent col-5 text-light" onClick="btnView('${element.title}','${element.content}')">${element.content}</div>
                    <div class="col-3 d-flex">
                        <button class="btn-edit" type="button" onClick="btnEdit('${element.title}','${element.content}','${element._id}')">Edit</button>
                        <button class="btn-delete" type="button" onClick="btnDelete('${element._id}')">Delete</button>
                    </div>
                </div>
            `);
    });
  });
}

//pagination
function isPagination(count, currentPage) {
  if (doListStatus == "add") {
    $("#pagination").pagination({
      items: count,
      itemsOnPage: 5,
      cssStyle: "light-theme",
      onPageClick: function(pagesNum) {
        dataDB(pagesNum);
      },
      currentPage: Math.ceil(count / 5),
      onInit: dataDB(Math.ceil(count / 5))
    });
  } else if (doListStatus == "delete") {
    $("#pagination").pagination({
      items: count,
      itemsOnPage: 5,
      cssStyle: "light-theme",
      onPageClick: function(pagesNum) {
        dataDB(pagesNum);
      },
      currentPage: currentPage,
      onInit: dataDB(currentPage)
    });
  } else {
    $("#pagination").pagination({
      items: count,
      itemsOnPage: 5,
      cssStyle: "light-theme",
      onPageClick: function(pagesNum) {
        dataDB(pagesNum);
      },
      currentPage: currentPage,
      onInit: dataDB(currentPage)
    });
  }
}

//refresh
function refreshPages(currentPage) {
  let search = $("#search").val();
  $.ajax({
    type: "GET",
    url: "/api/total/?search=" + search
  }).then(function(count) {
    isPagination(count, currentPage);
  });
}
//button view
function btnView(title, content) {
  $("#modal-title").prop("disabled", true);
  $("#modal-content").prop("disabled", true);
  $("#modal-update").hide();
  $("#modal").modal("show");
  $("#modal-title").val(title);
  $("#modal-content").val(content);
}

//button search
$("#btn-search").click(function() {
  let search = $("#search").val();
  $.ajax({
    type: "GET",
    url: "/api/do-list/?search=" + search,
    dataType: "json"
  }).then(function(data) {
    if (data.code == 200) {
      // return render(data.data)
      refreshPages(1);
    }
    if (data.code == 404) {
      return $("#list-users").html(data.message);
    }
  });
});

//button edit
function btnEdit(title, content, id) {
  doListStatus = "edit";
  $("#modal").modal("show");
  $("#modal-title").prop("disabled", true);
  $("#modal-content").prop("disabled", false);
  $("#modal-update").show();
  $("#modal-title").val(title);
  $("#modal-content").val(content);
  $("#modal-update")
    .off("click")
    .on("click", function(content) {
      let textContent = $("#modal-content").val();
      let data = {
        _id: id,
        content: textContent
      };
      $.ajax({
        type: "PUT",
        url: "/api/do-list?id=" + id,
        data: data,
        dataType: "json"
      })
        .then(function(data) {
          if (data.code == 404) {
            return alert(data.message);
          }
        })
        .catch(function(err) {
          window.location.href = "/login";
        });
      $("#modal").modal("hide");
      let currentPage = parseInt($(".current").text());
      refreshPages(currentPage);
    });
}

//button delete
function btnDelete(id) {
  doListStatus = "delete";
  $.ajax({
    type: "DELETE",
    url: "/api/do-list?id=" + id,
    dataType: "json"
  })
    .then(function(res) {
      if (data.code == 404) {
        return alert(data.message);
      } else {
        let currentPage = parseInt($(".current").text());
        refreshPages(currentPage);
      }
    })
    .catch(function(err) {
      window.location.href = "/login";
    });
}

//button add
function btnAdd() {
  doListStatus = "add";
  $("#modal").modal("show");
  $("#modal-title").prop("disabled", false);
  $("#modal-title").val("");
  $("#modal-content").prop("disabled", false);
  $("#modal-content").val("");
  $("#modal-update").show();
  $("#modal-update")
    .off("click")
    .on("click", function() {
      let title = $("#modal-title").val();
      let content = $("#modal-content").val();
      let data = {
        title: title,
        content: content
      };
      let token = document.cookie;
      $.ajax({
        beforeSend: function(xhr, settings) {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        type: "POST",
        url: "api/do-list",
        data: data,
        dataType: "json"
      })
        .then(function(data) {
          if (data.code == 404) {
            return alert(data.message);
          }
        })
        .catch(function(err) {
          window.location.href = "/login";
        });
      $("#modal").modal("hide");
      refreshPages();
    });
}

//button logout
$("#btn-logout").on("click", function() {
  let token = document.cookie.split("=")[1];
  $.ajax({
    type: "POST",
    url: "/logout",
    data: token,
    dataType: "json"
  }).then(function(data) {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.href = "/home";
  });
});
