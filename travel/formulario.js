function showTooltip() {
    $("input[type='radio']").hover(function () {
        let tooltipText = $(this).data("tooltip");
        $(this).next(".tooltip").text(tooltipText);
    }, function () {
        $(this).next(".tooltip").text("");
    });
}


function selectAsientos() {

    let numTickets = 1;

    $('#numTick').change(function () {
        numTickets = parseInt($('#numTick').val());
        $("#seat-map input[type='checkbox']").prop("checked", false);
    });


    $('#seat-map input[type="checkbox"]').change(function () {
        let checkboxes = $('#seat-map input[type="checkbox"]:checked');
        if (checkboxes.length > numTickets) {
            this.checked = false;
        }
    });
}

function dateValidator() {
    let today = new Date();
    $('#date_salida, #date_llegada').change(function () {
        // Obtener las fechas de los campos de entrada
        let fechaSalida = Date.parse($('#date_salida').val());
        let fechaLlegada = Date.parse($('#date_llegada').val());

        // Validar las fechas
        if (fechaSalida >= fechaLlegada) {
            $("#errorDataLlegada").text("La fecha de llegada debe ser superior a la de regreso.");
            $('#date_salida').val('').focus();
            $('#date_llegada').val('').focus();
        } else if (fechaSalida < today || fechaLlegada < today) {
            $("#errorDataOrigin").text("Para ayer no hay ticket, ni para hoy");
            $('#date_llegada').val('').focus();
            $('#date_salida').val('').focus();
        } else {
            $("#errorDataOrigin, #errorDataLlegada").text("");
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
            let formContainer = $('<div class="personalDataSection">');
            formContainer.attr('id', 'form' + i);

            // Copiar el HTML del formulario
            let formHtml = $('#p1').html();
            formContainer.html(formHtml);

            // Asignar un ID único a cada campo de entrada y mensaje de error
            formContainer.find('input').each(function () {
                let oldId = $(this).attr('id');
                let newId = oldId.slice(0, -2) + '_' + i;
                console.log(newId);
                $(this).attr('id', newId);
            });
            formContainer.find('p').each(function () {
                let oldId = $(this).attr('id');
                let newId = oldId.slice(0, -2) + '_' + i;
                $(this).attr('id', newId);
            });

            // Agregar el nuevo formulario al contenedor de formularios
            $('#extraPersons').append(formContainer);

            // Actualizar el título del formulario
            let formTitle = 'Datos personales persona ' + i;
            $('#form' + i + ' .title2').text(formTitle);
        }

        // SelectAsientos();

    });
}

function validateDNI(dni) {
    if (dni.length > 9)
        return false;
    let valid = true;
    dni = dni.toUpperCase();
    let letrasValidas = 'TRWAGMYFPDXBNJZSQVHLCKET';
    let calculoLetra = letrasValidas[dni.slice(0, 8) % 23];
    if (!(dni.slice(8, 9) == calculoLetra))
        valid = false;
    return valid;
}


function checkEmail(email) {
    return /\S+@\S+\.\S+/.poke_form(email);
}

function checkNums(num) {
    return /^[0-9\s-]+$/.poke_form(num);
}

function calculateDays() {
    startDate = $("#date_salida").val();
    endDate = $("#date_llegada").val();
    let diff = 0;
    if (startDate && endDate) {
        let start = new Date(startDate);
        let end = new Date(endDate);
        diff = Math.floor((end - start) / (1000 * 60 * 60 * 24)); // Convertimos de milisegundos a días
        console.log(diff); // Mostramos la diferencia en días en la consola
    }
    return diff;
}

function validateData(formNum, valid) {
    // Obtener los elementos del formulario
    let nombre = $('#nombre_' + formNum);
    let apellido = $('#apellido_' + formNum);
    let dni = $('#dni_' + formNum);
    let cp = $('#cp_' + formNum);
    let age = $('#age_' + formNum);

    //Obetener mensajes de error

    // Establecer las expresiones regulares para la validación
    let strValidator = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    // Validación de los campos
    if (nombre.val() == '') {
        nombre.css('border', "2px solid orange");
        valid = false;
    } else {
        if (!strValidator.test(nombre.val())) {
            $('#errorNom_' + formNum).show();
            nombre.css('border', "2px solid red");
            valid = false;
        } else {
            // console.log(nombre.val());
            $('#errorNom_' + formNum).hide();
            nombre.css('border', "2px solid green");
        }
    }

    if (apellido.val() == '') {
        valid = false;
        apellido.css('border', "2px solid orange");
    } else {
        if (!strValidator.test(apellido.val())) {
            $('#errorAp_' + formNum).show();
            apellido.css('border', "2px solid red");
            valid = false;
        } else {
            $('#errorAp_' + formNum).hide();
            apellido.css('border', "2px solid green");
        }
    }

    if (dni.val() == '') {
        valid = false;
        dni.css('border', "2px solid orange");
    } else {
        if (validateDNI(dni.val())) {
            $('#errorDNI_' + formNum).hide();
            dni.css('border', "2px solid green");
        } else {
            valid = false;
            $('#errorDNI_' + formNum).show();
            dni.css('border', "2px solid red");
        }
    }

    if (cp.val() == '') {
        valid = false;
        cp.css('border', "2px solid orange");
    } else {
        if (isNaN(cp.val())) {
            valid = false;
            $('#errorCP_' + formNum).show();
            cp.css('border', "2px solid red");
        } else {
            $('#errorCP_' + formNum).hide();
            cp.css('border', "2px solid green");
        }
    }

    if (age.val() == '') {
        valid = false;
        age.css('border', "2px solid orange");
    } else {
        if (isNaN(age.val())) {
            valid = false;
            $('#errorEdad_' + formNum).show();
            age.css('border', "2px solid red");
        } else {
            $('#errorEdad_' + formNum).hide();
            age.css('border', "2px solid green");
        }
    }
    return valid;
}

//Validar datos del vuelo no esten vacios
function preventEmptyData() {
    if ($("#origen, #destino, #numTick").val() == "0" || $("#date_salida, #date_llegada").val() == "") {
        // código para manejar el error
    }

}

// Validador para cada sección de datos personales
function validatePersonalData(valid) {
    let numTickets = parseInt($('#numTick').val());
    for (let i = 1; i <= numTickets; i++) {
        valid = validateData(i, valid);
    }
    return valid;
}

//Validacion de formularios
function isValidForm() {
    let valid = true;
    // console.log("ValidatorForm = " + valid)
    // validatePersonalData(valid) && 
    if (!validatePersonalData(valid))
        valid = false;
    console.log("isValidForm = " + valid);

    return valid;
}

function priceCalculator() {
    $("input[type='radio'], select, .serviceDay, .service").change(function () {
        let numTickets = parseInt($('#numTick').val());
        let numDays = calculateDays();
        let ticketTypePrice = parseInt($("input[name='ticket-type']:checked").val()) + 80;
        let extraService = 0;

        $(".serviceDay").each(function () {
            if ($(this).is(":checked"))
                extraService += parseInt($(this).val()) * numDays;
                console.log("Day pay extra = " + extraService);
        });

        $(".service").each(function () {
            if ($(this).is(":checked"))
                extraService += parseInt($(this).val());
        });

        console.log(extraService);
        let price = ticketTypePrice * numTickets + extraService;
        $("#price").text("Total price = " + price + "€");
        return price;
    });
}

function submitFormValidate() {
    $("form").submit(function () {
        calculateDays();
        //Esconde el formulario y enseña la frase señalada
        let done = isValidForm();
        if (done) {
            let msj = $("#sub_msj").html();
            $("#sub_msj").html('Sus tickets llegaran a su correo principal.');
            console.log("Submit msj = " + msj);
            $("form").hide();
        }
        event.preventDefault();
    });
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

    //Calcula el precio
    priceCalculator();

    // Valida el formulario al hacer submit
    submitFormValidate();

});