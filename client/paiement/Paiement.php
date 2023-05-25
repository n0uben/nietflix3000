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
    <title>Paiement</title>
<link rel="stylesheet" href="Paiement.css" media="screen">
    <script class="u-script" type="text/javascript" src="jquery.js" defer=""></script>
    <script class="u-script" type="text/javascript" src="nicepage.js" defer=""></script>
    <meta name="generator" content="Nicepage 5.7.9, nicepage.com">
    <meta name="referrer" content="origin">
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    
    
    
    <script type="application/ld+json">{
		"@context": "http://schema.org",
		"@type": "Organization",
		"name": "",
		"logo": "images/logo.png"
}</script>
    <meta name="theme-color" content="#478ac9">
    <meta property="og:title" content="Paiement">
    <meta property="og:type" content="website">
  <meta data-intl-tel-input-cdn-path="intlTelInput/" /></head>
  <body class="u-body u-xl-mode" data-lang="fr"><header class="u-clearfix u-header u-palette-1-base u-header" id="sec-63e4"><div class="u-clearfix u-sheet u-sheet-1">
        <a href="http://localhost/film/index.html" class="u-image u-logo u-image-1" data-image-width="227" data-image-height="100">
          <img src="img/logo.png">
        </a>
      </div></header>
    <section class="u-clearfix u-container-align-center u-section-1" id="sec-d491">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="u-clearfix u-expanded-width u-gutter-6 u-layout-wrap u-layout-wrap-1">
          <div class="u-layout">
            <div class="u-layout-row">
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
                  <div class="u-expanded-width u-list u-list-1">
                    <div class="u-repeater u-repeater-1">
                      <div class="u-container-style u-list-item u-repeater-item">
                        <div class="u-container-layout u-similar-container u-container-layout-3">
                          <h3 class="u-text u-text-default u-text-6">Normal</h3>
                          <h4 class="u-text u-text-7">10&nbsp;€</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="u-form u-form-1">
                    <form action="https://forms.nicepagesrv.com/v2/form/process" class="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" style="padding: 10px" source="email" name="form">
                      <div class="u-form-group u-form-select u-label-none u-form-group-1" id="Select">
                        
                      </div>
                    </form>
                  </div>

                  <h3 class="u-text u-text-default u-text-8" id="Place_libre">Place de libre : ?</h3>
                  <h2 class="u-text u-text-default u-text-9">Paiement</h2>

                  <div class="u-form u-form-2">
                    <form action="https://forms.nicepagesrv.com/v2/form/process" class="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" style="padding: 10px" source="email" name="form" id="Formulaire_BC">
                      <div class="u-form-group u-form-name u-label-none">
                        <label for="name-3b9a" class="u-label">Name</label>
                        <input type="text" placeholder="Numero Carte Bancaire" id="name-3b9a" name="name" class="u-input u-input-rectangle" required="">
                      </div>
                      <div class="u-align-left u-form-group u-form-submit">
                        <a href="#" class="u-btn u-btn-submit u-button-style">Valider</a>
                        <input type="submit" value="submit" class="u-form-control-hidden">
                      </div>
                      <input type="hidden" value="" name="recaptchaResponse">
                      <input type="hidden" name="formServices" value="cad8827a45c21d70f2c93fec4a2fb55f">
                    </form>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="u-clearfix u-palette-1-base u-section-2" id="sec-0664">
      <div class="u-clearfix u-sheet u-sheet-1">
        <p class="u-text u-text-1" id="Prix">0,00€<br>0 ticket(s)
        </p>
        <a href="http://localhost/details/index.php" class="u-btn u-button-style u-none u-text-body-alt-color u-text-hover-white u-btn-2" id="Retour">Retour </a>
      </div>
    </section>
    
    
    <footer class="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-7763"><div class="u-clearfix u-sheet u-sheet-1">
        <p class="u-small-text u-text u-text-variant u-text-1"> © 2023 NietFlix, Inc</p>
      </div></footer>

  
</body></html>


<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.4.1/socket.io.min.js"></script>


<script>
  const socket = io.connect('ws://localhost:5000');
  // créer une variable pour la liste déroulante
  var selectBox = document.createElement("select");
  selectBox.className = "u-input u-input-rectangle";
  selectBox.id = "selectbox";

  const params = new URLSearchParams(window.location.search);
  const id = params.get('salle');  
  const IDSeance = params.get('id_seance');
  const CinemaID = params.get('id');  

  var NumberPlace;
  var ElementTextNumberPlace = document.getElementById("Place_libre");
  var placesDispo = 10;
  
  socket.emit('get_place_by_seance_id', { seance_id: IDSeance });
  socket.on('place_info', function(data) {
      placesDispo = parseInt(data.places.placeDispo);
      ElementTextNumberPlace.innerHTML = "Place de libre : " + placesDispo;
  });

  if(placesDispo < 10)
  {
    for (var i = 0; i <= placesDispo; i++) {
    var option = document.createElement("option");
    option.text = i;
    selectBox.add(option);
    }
  }
  else
  {
    for (var i = 0; i <= 10; i++) {
    var option = document.createElement("option");
    option.text = i;
    selectBox.add(option);
    }
  }

  
  // ajouter la liste déroulante à la page HTML
  var container = document.getElementById("Select");
  container.appendChild(selectBox);

  </script>
  
  <script>
    // trouver la liste déroulante (select) et la div "Seance"
    var selectBox = document.getElementById("selectbox");
    var prixDiv  = document.getElementById("Prix");

    // ajouter un écouteur d'événement (event listener) à la liste déroulante
    selectBox.addEventListener("change", function() {
        // effacer le contenu de la div "Seance"
        prixDiv.innerHTML  = selectBox.value * 10 + "€<br>" + selectBox.value + " ticket(s)";
    });
  </script>



  <script>
    // Récupérer la valeur d'un paramètre spécifique
    const FilmID = params.get('film_id');
    const Salle = params.get('salle');
    const Cinema = params.get('id');

    // Sélectionnez l'élément a
    const lien = document.getElementById('Retour');

    // Changer la valeur de l'attribut href
    lien.href = 'http://localhost/details/index.php?film_id=' + FilmID + '&id=' + Cinema;
  </script>




<script>

    // Récupérer le formulaire
    const monFormulaire = document.getElementById("Formulaire_BC");

    // Ajouter un écouteur d'événements sur le formulaire pour détecter la soumission
    monFormulaire.addEventListener("submit", function(event) {
      // Empêcher le comportement par défaut du formulaire (recharger la page)
      event.preventDefault();
      
      // Lire le contenu des champs du formulaire
      const CarteBancaire = document.getElementById("name-3b9a").value;
      
      if(CarteBancaire != null && selectBox.value != 0)
      {
        const socket = io.connect('ws://localhost:5000');

        socket.emit('check_bank_card', { number: CarteBancaire });
        socket.on('card_check_result', function(data) { 
            if(data.is_valid)
            {
              console.log('Verif carte :', data.is_valid);
              socket.emit('update_place_seance', { id: IDSeance, places_a_enlever: selectBox.value });
              console.log("ID seance : " + IDSeance + " Select box : " + selectBox.value);
              socket.on('update_success', function(data) {
                  console.log('Mise à jour réussie:', data);
                  
                  window.location.href = "http://localhost/ticket/ticket.php?id=" + Cinema + "&film_id=" + FilmID + "&salle=" + Salle + "&id_seance=" + IDSeance + "&place=" + selectBox.value;
              });
              socket.on('update_error', function(data) {
                  console.log('Erreur lors de la mise à jour:', data);
              });
            }
        });
        socket.on('card_check_error', function(data) {
            console.log('Erreur lors de la verification de la carte bancaire:', data);
        });

        // Gérer les erreurs
        socket.on('error', function(data) {
            console.error('Error:', data.message);
        });
      }

      // Réinitialiser le formulaire
      monFormulaire.reset();
    });

   
</script>