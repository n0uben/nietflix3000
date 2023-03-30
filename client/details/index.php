<?php
if (isset($_GET['film_id'])) {
  // L'utilisateur a envoyé un paramètre "parametre" dans la requête GET
  $id = $_GET['film_id'];
}
else {
  // L'utilisateur n'a pas envoyé de paramètre "parametre" dans la requête GET
  $id = 1;
}

if(isset($_GET['id']))
{
$id_cinema = $_GET['id'];
}
else
{
$id_cinema = 1;
}
?>


<!DOCTYPE html>
<html style="font-size: 16px;" lang="fr"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="Les autres films a l&amp;apos;affiche">
    <meta name="description" content="">
    <title>Accueil</title>
    <link rel="stylesheet" href="nicepage.css" media="screen">
    <link rel="stylesheet" href="Accueil.css" media="screen">

    <meta name="generator" content="Nicepage 5.7.9, nicepage.com">
    <meta name="referrer" content="origin">
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    <script src="date.js"></script>
  <meta data-intl-tel-input-cdn-path="intlTelInput/" /></head>
  <body data-home-page="Accueil.html" data-home-page-title="Accueil" class="u-body u-xl-mode" data-lang="fr">
    <header class="u-clearfix u-header u-header" id="sec-63e4">
      <div class="u-clearfix u-sheet u-sheet-1">
        <?php echo "<a href=\"http://localhost/dashboard/accueil.php?id=" . $id_cinema . "\" class=\"u-image u-logo u-image-1\">" ?>
          <img src="images/logo.png">
        </a>
      </div>
    </header>
    <section class="u-align-center u-clearfix u-section-1" id="sec-e3d4">
        <?php
        

        // Définir l'adresse de l'API GraphQL
        $url = 'http://localhost:8081/graphql';

        // Définir la requête GraphQL
        $query = 'query {
          movieById(id: ' . $id . ') {
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
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <div class="u-form u-form-1">
          <form action="https://forms.nicepagesrv.com/v2/form/process" class="u-clearfix u-form-horizontal u-form-spacing-15 u-inner-form" style="padding: 15px" source="email">
            <div class="u-form-group u-form-url u-label-top u-form-group-1" id="Select">
                <label for="name-558c" class="u-label">Choisir une date</label>
                <script>
                  // créer une variable pour la liste déroulante
                  var selectBox = document.createElement("select");
                  selectBox.className = "u-input u-input-rectangle";
                  selectBox.id = "selectbox";
                  
                  // créer les options pour la liste déroulante
                  var option1 = document.createElement("option");
                  option1.text = "Aujourd'hui";
                  selectBox.add(option1);

                  for (var i = 1; i <= 4; i++) {
                    var date = new Date();
                    date.setDate(date.getDate() + i);
                    var option = document.createElement("option");
                    option.text = date.toLocaleDateString();
                    selectBox.add(option);
                  }

                  // ajouter la liste déroulante à la page HTML
                  var container = document.getElementById("Select");
                  container.appendChild(selectBox);


                  </script>
            </div>
            <div class="u-form-group u-form-submit u-label-top u-form-group-2">
              <a href="#" class="u-btn u-btn-submit u-button-style">Valider</a>
              <input type="submit" value="submit" class="u-form-control-hidden">
            </div>
          </form>

          <div id="Seance">

          <script>
            // trouver la liste déroulante (select) et la div "Seance"
            var selectBox = document.getElementById("selectbox");
            var seanceDiv = document.getElementById("Seance");

            // ajouter un écouteur d'événement (event listener) à la liste déroulante
            selectBox.addEventListener("change", function() {
              // effacer le contenu de la div "Seance"
              seanceDiv.innerHTML = "";
              
              // créer une nouvelle div avec le texte "salut"
              var newDiv = document.createElement("div");
              newDiv.innerHTML = "salut";
              
              // ajouter la nouvelle div à la div "Seance"
              seanceDiv.appendChild(newDiv);
            });
          </script>

          </div>
        </div>
      </div>
    </section>
    <section class="u-clearfix u-container-align-center u-section-2" id="sec-d491">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="u-clearfix u-expanded-width u-gutter-6 u-layout-wrap u-layout-wrap-1">
          <div class="u-layout">
            <div class="u-layout-row">
              <div class="u-container-style u-custom-color-1 u-layout-cell u-size-20 u-layout-cell-1">
                <div class="u-container-layout u-container-layout-1">
                  <img class="u-expanded-width u-image u-image-default u-image-1" src="<?php echo $data->data->movieById->imageUrl; ?>" alt="" data-image-width="400" data-image-height="265">
                  <h2 class="u-align-center u-text u-text-default u-text-1"> <?php echo $data->data->movieById->nom; ?></h2>
                  <h5 class="u-align-center u-text u-text-default u-text-2">Duree :  <?php echo $data->data->movieById->duree; ?></h5>
                    <h5 class="u-align-center u-text u-text-default u-text-3">Date :&nbsp; <?php echo $data->data->movieById->dateSortie; ?></h5>
                    <h5 class="u-align-center u-text u-text-default u-text-3">Genre :&nbsp; <?php echo $data->data->movieById->genre; ?></h5>
                </div>
              </div>
              <div class="u-container-style u-layout-cell u-size-40 u-layout-cell-2">
                <div class="u-container-layout u-container-layout-2">
                  <h4 class="u-text u-text-default u-text-4"> Description</h4>
                  <h6 class="u-text u-text-default u-text-palette-5-base u-text-5"> <?php echo $data->data->movieById->description; ?></h6>
                  <p class="u-text u-text-default u-text-8">Place restantes : ?</p>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>


    <section class="u-align-center u-clearfix u-section-3" id="sec-16e2">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h3 class="u-text u-text-default u-text-1">Les autres films a l'affiche</h3>
        <div class="u-expanded-width u-gallery u-layout-grid u-lightbox u-show-text-on-hover u-gallery-1">
          <div class="u-gallery-inner u-gallery-inner-1">

              <?php
              // Définir l'adresse de l'API GraphQL
              $url = 'http://localhost:8081/graphql';

              // Définir la requête GraphQL
              $query = 'query listMovies {
                        allMovies {
                            id
                            nom
                            dateSortie
                            duree
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

              // Définir la fonction de tri pour les films par date de sortie
              function sortMoviesByDate($a, $b) {
                  return strtotime($a->dateSortie) - strtotime($b->dateSortie);
              }

              // Récupérer les données de la requête GraphQL
              $data = json_decode($result);

              // Récupérer la liste de tous les films
              $movies = $data->data->allMovies;

              // Trier les films par date de sortie
              usort($movies, 'sortMoviesByDate');




              ?>

              <div class="u-effect-fade u-gallery-item">
                  <img class="u-back-image u-expanded" src="http://localhost:8081/uploads/tontons-flingueurs.png"></a>
                  <div class="u-over-slide u-shading u-over-slide-1">
                      <h3 class="u-gallery-heading"></h3>
                      <p class="u-gallery-text"></p>
                  </div>
              </div>

              <div class="u-effect-fade u-gallery-item">
                  <img class="u-back-image u-expanded" src="http://localhost:8081/uploads/le-parrain.png"></a>
                  <div class="u-over-slide u-shading u-over-slide-1">
                      <h3 class="u-gallery-heading"></h3>
                      <p class="u-gallery-text"></p>
                  </div>
              </div>
              <div class="u-effect-fade u-gallery-item">
                  <img class="u-back-image u-expanded" src="http://localhost:8081/uploads/guerre-etoiles.png"></a>
                  <div class="u-over-slide u-shading u-over-slide-1">
                      <h3 class="u-gallery-heading"></h3>
                      <p class="u-gallery-text"></p>
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