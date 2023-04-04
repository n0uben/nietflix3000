
<?php
if (isset($_GET['film_id'])) {
  // L'utilisateur a envoyé un paramètre "parametre" dans la requête GET
  $film_id = $_GET['film_id'];
}
else {
  // L'utilisateur n'a pas envoyé de paramètre "parametre" dans la requête GET
  $film_id = 1;
}

if(isset($_GET['salle']))
{
$salle = $_GET['salle'];
}
else
{
$salle = 1;
}

if(isset($_GET['id']))
{
$id = $_GET['id'];
}
else
{
$id = 1;
}



        // Définir l'adresse de l'API GraphQL
        $url = 'http://localhost:8081/graphql';

        // Définir la requête GraphQL
        $query = 'query {
          movieById(id: ' . $film_id . ') {
            id
            nom
            description
            dateSortie
            duree
            genre
            imageUrl
          }
        }';

        // Configurer les options de la requête HTTP
        $options = array(
            'http' => array(
                'method' => 'POST',
                'header' => array(
                    'Content-Type: application/json',
                ),
                'content' => json_encode(array(
                    'query' => $query,
                )),
            ),
        );

        // Créer une ressource de flux de contexte HTTP
        $context = stream_context_create($options);

        // Exécuter la requête HTTP en utilisant le flux de contexte HTTP
        $result = file_get_contents($url, false, $context);

        // Récupérer les données de la requête GraphQL
        $data = json_decode($result);

?>


<!DOCTYPE html>
<html style="font-size: 16px;" lang="fr"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="Les autres films a l&amp;apos;affiche">
    <meta name="description" content="">
    <title>Ticket</title>
    <link rel="stylesheet" href="nicepage.css" media="screen">
<link rel="stylesheet" href="Ticket.css" media="screen">
    <script class="u-script" type="text/javascript" src="jquery.js" defer=""></script>
    <script class="u-script" type="text/javascript" src="nicepage.js" defer=""></script>
    <meta name="generator" content="Nicepage 5.7.9, nicepage.com">
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    
    
    <script type="application/ld+json">{
		"@context": "http://schema.org",
		"@type": "Organization",
		"name": "",
		"logo": "images/logo.png"
}</script>
    <meta name="theme-color" content="#478ac9">
    <meta property="og:title" content="Ticket">
    <meta property="og:type" content="website">
  <meta data-intl-tel-input-cdn-path="intlTelInput/" /></head>
  <body class="u-body u-xl-mode" data-lang="fr"><header class="u-clearfix u-header u-palette-1-base u-header" id="sec-63e4"><div class="u-clearfix u-sheet u-sheet-1">
        <a href="/film/index.html" class="u-image u-logo u-image-1" data-image-width="227" data-image-height="100">
          <img src="images/logo.png" class="u-logo-image u-logo-image-1">
        </a>
      </div></header>
    <section class="u-clearfix u-container-align-center u-section-1" id="sec-d491">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="u-clearfix u-expanded-width u-gutter-6 u-layout-wrap u-layout-wrap-1">
          <div class="u-layout" style="">
            <div class="u-layout-row" style="">
              <div class="u-container-style u-custom-color-1 u-layout-cell u-size-20 u-layout-cell-1">
                <div class="u-container-layout u-container-layout-1">
                  <h2 class="u-align-center u-text u-text-default u-text-1"><?php echo $data->data->movieById->nom; ?></h2>
                  <h5 class="u-align-center u-text u-text-default u-text-3">Date : <?php echo $data->data->movieById->dateSortie; ?></h5>
                  <img class="u-image u-image-default u-image-1" src="<?php echo $data->data->movieById->imageUrl; ?>" alt="" data-image-width="400" data-image-height="265">
                  <h5 class="u-align-center u-text u-text-default u-text-4">Salle <?php echo $salle; ?><br>
                  </h5>
                  <h5 class="u-align-center u-text u-text-default u-text-5">Duree : <?php echo $data->data->movieById->duree; ?></h5>
                </div>
              </div>
              <div class="u-container-style u-layout-cell u-size-40 u-layout-cell-2">
                <div class="u-container-layout u-container-layout-2">
                  <h1 class="u-text u-text-default u-text-6">Ticket</h1>
                  <h3 class="u-text u-text-default u-text-7" id="Place">Vous avez prit ? places</h3>
                  <h3 class="u-text u-text-default u-text-8" id="Seance" >Pour la seance ?</h3>
                  <h3 class="u-text u-text-default u-text-9" id="horraireDebut">Début de seance : ???</h3>
                  <h3 class="u-text u-text-default u-text-10" id="FinSeance">Fin de seance : ??</h3>
                  <a href="/film/index.html" class="u-border-none u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-2-base u-radius-50 u-btn-1">Accueil</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    
    <footer class="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-7763"><div class="u-clearfix u-sheet u-sheet-1">
        <p class="u-small-text u-text u-text-variant u-text-1"> © 2023 NietFlix, Inc</p>
      </div></footer>
    
  
</body></html>


<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.4.1/socket.io.min.js"></script>

<script>
  const socket = io.connect('ws://localhost:5000');

  const params = new URLSearchParams(window.location.search);
  const IDSeance = params.get('id_seance');
  const Place = params.get('place');

  var horraireDebut = document.getElementById("horraireDebut");
  var FinSeance = document.getElementById("FinSeance");
  var Seance = document.getElementById("Seance");
  var PlaceE = document.getElementById("Place");
  
  socket.emit('get_place_by_seance_id', { seance_id: IDSeance });
  socket.on('place_info', function(data) {
    horraireDebut.innerHTML = "Début de seance : " + data.places.horraireDebut;
    FinSeance.innerHTML = "Fin de seance : " + data.places.horraireFin;
    Seance.innerHTML = "Pour la seance : " + IDSeance;
    PlaceE.innerHTML = "Vous avez prit  " + Place + " places";
  });
    
</script>



