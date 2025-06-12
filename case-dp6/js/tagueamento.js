// Preencha este arquivo com qualquer código que você necessite para realizar a
// coleta, desde a biblioteca analytics.js, gtag.js ou o snippet do Google Tag 
// Manager. No último caso, não é necessário implementar a tag <noscript>.
// O ambiente dispõe da jQuery 3.5.1, então caso deseje, poderá utilizá-la
// para fazer a sua coleta.
// Caso tenha alguma dúvida sobre o case, não hesite em entrar em contato.

// OBS.: tag global site tag (gtag.js) - Google Analytics foi adicionada na <head> do HTML de cada página conforme indicação do Google para melhor funcionamento

addEventListener('DOMContentLoaded', function() {

    let btnDownload = document.querySelector('.menu-lista-download');
    let btnContato = document.querySelector('.menu-lista-contato');
    let pageLocation = window.location.href;
    let cardsMontadoras = document.querySelectorAll('.card-montadoras');
    let form = document.querySelector('.contato');

    btnDownload.addEventListener('click', function(){
        console.log('Download PDF clicked');
        gtag('event', 'file_download', {
            'page_location': pageLocation,
            'element_name': 'download_pdf',
            'element_group': 'menu'
        });
    })

    btnContato.addEventListener('click', function(){
        console.log('Entre em contato clicked');
        gtag('event', 'click', {
            'page_location': pageLocation,
            'element_name': 'entre_em_contato',
            'element_group': 'menu'
        });
    })
  
    gtag('event', 'page_view', {
        'page_path': window.location.pathname,
        'page_title': document.title
    });

    cardsMontadoras.forEach(function(card) {
        card.addEventListener('click', function() {
            let montadoraName = card.querySelector('.card-title').innerText;
            console.log('Montadora clicked:', montadoraName);
            gtag('event', 'click', {
                'page_location': pageLocation,
                'element_name': montadoraName,
                'element_group': 'ver_mais'
            });
        });
    });

    const campos = form.querySelectorAll('input, textarea, select');
    let ultimoCampo = null;
    let campoPreenchido = false;

    campos.forEach(function(campo) {
        campo.addEventListener('input', function() {
            campoPreenchido = campo.value !== '';
        });

        campo.addEventListener('focus', function() {
            ultimoCampo = campo;
        });

        campo.addEventListener('blur', function() {
            if (campoPreenchido) {
                console.log('Campo preenchido e mudou:', campo.name || campo.id);
                gtag('event', 'form_start', {
                    'page_location': pageLocation,
                    'form_id': form.id || form.className,
                    'form_name': form.name || form.className,
                    'form_destination': form.action || '',
                });
                campoPreenchido = false;
            }
        });
    });

    if (form) {
        form.addEventListener('submit', function(e){
            e.preventDefault();
            console.log('Form submitted');
            
            gtag('event', 'form_submit', {
                'page_location': pageLocation,
                'form_id': form.id || form.className || '',
                'form_name': form.name || form.className || '',
                'form_destination': form.action || '',
                'form_submit_text': document.querySelector("form button") ? document.querySelector("form button").innerText : '',
            });
        });
    }

    let formSuccessSent = false;
    setInterval(function(){
        var message = document.querySelector("body > div.lightbox > div.lightbox-content");
        if (message && message.innerText.includes('Obrigado pelo seu contato!')) {
            if (!formSuccessSent) {
                console.log("Form has been sent successfully");
                gtag('event', 'view_form_success', {
                    'page_location': pageLocation,
                    'form_id': form ? (form.id || form.className || '') : '',
                    'form_name': form ? (form.name || form.className || '') : '',
                });
                formSuccessSent = true;
            }
        } else {
            formSuccessSent = false;
        }
    },500);
});
