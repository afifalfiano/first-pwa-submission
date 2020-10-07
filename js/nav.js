
document.addEventListener('DOMContentLoaded', function() {
  const elems = document.querySelectorAll('.sidenav');
  const quotesData = [
    'Benar di mata manusia belum tentu benar di mata Allah, begitu juga buruk di mata manusia belum tentu buruk di mata Allah',
    'Hidup ini hanya sekali dan peluang itu juga sekali munculnya, keduanya tidak datang dua kali',
    'Entah mengapa hari-hari ini akan cepat berlalu, dan senjapun mulai memberi kabar bahwa dia akan berlaku',
    'Hidup tak semudah membalikkan telapak tangan, tetapi dengan telapak tangan kita dapat merubah hidup kita jauh lebih baik lagi',
    'Penampilan memang tidak meyakinkan bahwa dia itu pintar atau bodoh',
    'Rencanakan sendiri target sukses anda arungi ala ide perwujudannya, rasakan indahnya memperoleh dampak tetes keringat kreativitas anda, bukan atas intruksi siapapun',
    'Jangan remehkan modal yang kecil, takukanlah kecilnya modal keberanian',
    'Semangat mengubah hidup dengan doa, kesabaran, keikhlasan, ikhtiar akan menjadi ibadah yang sempurna di hadapan Allah',
    'Orang sukses akan mengambil kesulitan sebagai peluang, orang gagal memandang kesulitan sebagai penghambat dirinya',
    'Jadilah pribadi yang menantang masa depan, bukan pengecut yang aman di zona nyaman',
    'Jika kamu gagal mendapatkan sesuatu hanya satu hal yang harus kamu lakukan, yaitu coba lagi',
    'Dunia tak lagi sama tak selamanya memihak kita, disaat kita mau berusaha disitulah kebahagiaan akan indah pada waktunya',
  ];
  M.Sidenav.init(elems);
  loadNav();


  function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        document.querySelectorAll('.topnav, .sidenav').forEach(
            function(elm) {
              elm.innerHTML = xhttp.responseText;
            });

        document.querySelectorAll('.sidenav a, .topnav a').forEach(
            function(elm) {
              elm.addEventListener('click', function(event) {
                const sidenav = document.querySelector('.sidenav');
                M.Sidenav.getInstance(sidenav).close();

                page = event.target.getAttribute('href').substr(1);
                loadPage(page);
              });
            },
        );
      }
    };
    xhttp.open('GET', 'nav.html', true);
    xhttp.send();
  }

  let page = window.location.hash.substr(1);

  if (page == '') page = 'home';
  loadPage(page);

  function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        const content = document.querySelector('#body-content');
        const footer = document.querySelector('#footer-content');
        if (this.status = 200) {
          content.innerHTML = xhttp.responseText;
          if (page != 'home' || page != '') {
            footer.innerHTML = `
          <style>
          .page-footer {
            padding-top: 0;
            width: 100%;
          }

          </style>     
        <footer class="page-footer  teal darken-3">
        <div class="footer-copyright teal darken-3">
          <div class="container">
          © 2020 Copyright all reserved by Afif Alfiano
          <a class="grey-text text-lighten-4 right" href="#home">Afif Alfiano</a>
          </div>
        </div>
      </footer>
            `;
          }
          if (page == 'home') {
            const carousel = document.querySelectorAll('.carousel');
            M.Carousel.init(carousel, {fullWidth: true, indicators: true});
          } else if (page == 'project') {
            const tootltip = document.querySelectorAll('.tooltipped');
            M.Tooltip.init(tootltip, {position: 'top'});
          } else if (page == 'about') {
            const modal = document.querySelectorAll('.modal');
            M.Modal.init(modal);
            const generate = document.querySelector('.generate');
            generate.addEventListener('click', function() {
              const randomNumber = Math.floor(Math.random() * (quotesData.length));
              document.getElementById('quotes').innerHTML = quotesData[randomNumber];
            });
          } else if (page == 'contact') {
            const collapse = document.querySelectorAll('.collapsible');
            M.Collapsible.init(collapse);
          }
        } else if (this.status == 404) {
          content.innerHTML = '<p> Halaman tidak ditemukan.</p<';
        } else {
          content.innerHTML = '<p>Upsss... halaman tidak dapat diakses</p>';
        }
      }
    };
    xhttp.open('GET', 'pages/' + page + '.html', true);
    xhttp.send();
  }
});
