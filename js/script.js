
$(document).ready(function () {
    $("#llamame").click(function () {
        $('.toast').toast('show');
    });
});


// Configurar los controles
var $breed_select = $('select.breed_select');
$breed_select.change(function() {
  var id = $(this).children(":selected").attr("id");
  getDogByBreed(id)
});

// Carga todas las razas
function getBreeds() {
  ajax_get('https://api.thedogapi.com/v1/breeds', function(data) {
    populateBreedsSelect(data)
  });
}
// Coloca el nombre de las razas en el selector
function populateBreedsSelect(breeds) {
  $breed_select.empty().append(function() {
    var output = '';
    $.each(breeds, function(key, value) {
      output += '<option id="' + value.id + '">' + value.name + '</option>';
    });
    return output;
  });
}
// se activa cuando cambia el control de selección de raza
function getDogByBreed(breed_id) {
  // Buscar imagenes que contenga la raza
  ajax_get('https://api.thedogapi.com/v1/images/search?include_breed=1&breed_id=' + breed_id, function(data) {

    if (data.length == 0) {
      // si no hay imágenes devueltas
      clearBreed();
      $("#breed_data_table").append("<tr><td>Sorry, no Image for that breed yet</td></tr>");
    } else {
      //de lo contrario, muestra la imagen y los datos de la raza
      displayBreed(data[0])
      console.log(data[0].breeds[0].life_span)
    }
  });
}
// borrar la imagen y la tabla
function clearBreed() {
  $('#breed_image').attr('src', "");
  $("#breed_data_table tr").remove();
}
// muestra la imagen y los datos de la raza
function displayBreed(image) {
  $('#breed_image').attr('src', image.url);
  $("#breed_data_table tr").remove();
  var breed_data = image.breeds[0]
  var annosVida = breed_data.life_span;
  var altura = breed_data.height.metric;
  var peso = breed_data.weight.metric;
<<<<<<< HEAD
  console.log("Años de vida: "+annosVida)
  console.log("Altura: "+altura)
  console.log("Peso: "+peso)
  $("#breed_data_table").append("<tr><td>Años de vida: </td><td>" + annosVida + "</td></tr>");
  $("#breed_data_table").append("<tr><td>Altura: </td><td>" + altura + "</td></tr>");
  $("#breed_data_table").append("<tr><td>Peso: </td><td>" + peso + "</td></tr>");
=======
  console.log("Años: "+annosVida)
  console.log("Altura: "+altura)
  console.log("Peso: "+peso)
  $("#breed_data_table").append("<tr><td style='text-align: right'>Años Perrunos: </td><td style='text-align: left'>" + annosVida + "</td></tr>");
  $("#breed_data_table").append("<tr><td style='text-align: right'>Altura: </td><td style='text-align: left'>" + altura + "</td></tr>");
  $("#breed_data_table").append("<tr><td style='text-align: right'>Peso: </td><td style='text-align: left'>" + peso + "</td></tr>");
>>>>>>> 242a978a495df6e473ad94e721bd782145e9a01d

}


// hacer una solicitud de Ajax

function ajax_get(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //console.log('responseText:' + xmlhttp.responseText);
      try {
        var data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        //console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
      callback(data);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
// llama a la función getBreeds que cargará todas las razas Dog en el control select
getBreeds();
