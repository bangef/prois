$(function () {
    $('#inputValue').on('input', function () {
        $('#show').removeClass('d-none');

        function hasil(selector) {
            let x = $('#inputValue').val();
            if (selector == 'dana_utama') {
                x *= 0.5;
            } else if (selector == 'dana_tabung') {
                x *= 0.3;
            } else {
                x *= 0.2;
            }

            let a = new Intl.NumberFormat('id-ID', {
                style: 'decimal',
            }).format(parseFloat(x));

            if (a == '0') {
                a = '';
                $('#show').addClass('d-none')
            } else {
                a = 'Rp. ' + a
            }

            $('#' + selector).text(a);
        }

        hasil('dana_utama');
        hasil('dana_tabung');
        hasil('dana_darurat');
    });
});