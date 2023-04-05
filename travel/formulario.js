function showTooltip() {
    $("input[type='radio']").hover(function () {
        var tooltipText = $(this).data("tooltip");
        $(this).next(".tooltip").text(tooltipText);
    }, function () {
        $(this).next(".tooltip").text("");
    });
}


function selectAsientos() {

    let numTickets = 1;

    $('#numTick').change(function () {
        numTickets = parseInt($('#numTick').val());
        console.log(numTickets); //borrar
        $("input[type='checkbox']").prop("checked", false);
    });


    $('input[type="checkbox"]').change(function () {
        let checkboxes = $('input[type="checkbox"]:checked');
        if (checkboxes.length > numTickets) {
            this.checked = false;
        }
    });
}

function dateValidator() {
    let today = new Date();

    // Escuchar los cambios en los campos de fecha
    $('#date_salida, #date_llegada').change(function () {
        // Obtener las fechas de los campos de entrada
        let fechaSalida = Date.parse($('#date_salida').val());
        let fechaLlegada = Date.parse($('#date_llegada').val());

        // Validar las fechas
        if (fechaSalida >= fechaLlegada) {
            //TODO
            //.show(error)
            alert('La fecha de salida debe ser anterior a la fecha de llegada.');
            $('#date_salida').val('').focus();
        } else if (fechaSalida < today || fechaLlegada < today) {
            //TODO
            //.show(error)
            alert('Las fechas deben ser superiores a la fecha actual.');
            $('#date_llegada').val('').focus();
        } else {
            //TODO
        }
    });

}

function specialNeed() {
    $('#special_text').hide();

    $('input[name="special"]').click(function () {
        if ($(this).val() == 1) {
            $('#special_text').show();
        } else {
            $('#special_text').hide();
        }
    });
}

//Desabilitar el mismo value si en el select ya seleccionada
function destinationDisable() {
    $('#origen').on('change', function () {
        let selected = $(this).val();
        $('#destino option').show(); // Mostrar todas las opciones primero
        $('#destino option[value="' + selected + '"]').hide(); // Ocultar la opción seleccionada en el otro select
    });

    $('#destino').on('change', function () {
        let selected = $(this).val();
        $('#origen option').show();
        $('#origen option[value="' + selected + '"]').hide();
    });
}

function formGenerator() {
    $('#numTick').change(function () {

        let numTickets = parseInt($('#numTick').val()) - 1;

        // Eliminar los formularios existentes
        $('#extraPersons').empty();

        // Generador de formularios dinámicamente
        for (let i = 2; i <= numTickets + 1; i++) {
            // Crear un nuevo div para el formulario
            let formContainer = $('<div>');
            formContainer.attr('id', 'form' + i);

            // Copiar el HTML del formulario
            let formHtml = $('#form1').html();
            formContainer.html(formHtml);

            // Agregar el nuevo formulario al contenedor de formularios
            $('#extraPersons').append(formContainer);
            let formTitle = 'Datos personales persona ' + i;
            $('#form' + i + ' .title2').text(formTitle);
        }

        // selectAsientos();

    });
}


function validateDNI(dni, valid) {
    dni = dni.toUpperCase();
    let letrasValidas = 'TRWAGMYFPDXBNJZSQVHLCKET';
    let calculoLetra = letrasValidas[dni.slice(0, 8) % 23];
    if (dni.slice(8, 9) == calculoLetra) valid = true;
    else valid = false;
    return valid;
}

function checkStr(cadena) {
    return /^[a-zA-Z\s-]+$/.poke_form(cadena);
}

function checkEmail(email) {
    return /\S+@\S+\.\S+/.poke_form(email);
}

function checkNums(num) {
    return /^[0-9\s-]+$/.poke_form(num);
}


$(document).ready(function () {

    // Inhabilitador de campos según elección de origen y destino
    destinationDisable();

    // Generador de formularios según el número de pasajeros del select
    formGenerator();

    // Valida que que la fecha sea una correcta
    dateValidator();

    // Según el número de asientos seleccionados así mismo se pueden elegir los asientos
    selectAsientos();

    // Muestra cuando haces hover el tooltipe
    showTooltip();

    // Vontrola el textarea de necesidades especiales
    specialNeed();

    // Controla que los datos insertados sean válidos
    // $("#airlineForm").submit(function () {
    //     return isValidForm();
    // });

});