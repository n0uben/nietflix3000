<!DOCTYPE html>
<html lang="fr">
<head>
    
    <meta charset="UTF-8">
    <title>Page d'accueil</title>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/headers/">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/headers.css" rel="stylesheet">
    <style>
        .b-example-divider {
            height: 3rem;
            background-color: rgba(0, 0, 0, .1);
            border: solid rgba(0, 0, 0, .15);
            border-width: 1px 0;
            box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
        }
    </style>
</head>
<body>
   

    </script>
    <!-- Header -->
    <div class="container">
        <header class="d-flex justify-content-center py-3">
            <ul class="nav nav-pills">
                <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">FILMS</a></li>
                <li class="nav-item"><a href="#" class="nav-link">HORAIRES</a></li>
                <li class="nav-item"><a href="#" class="nav-link">EVENEMENT</a></li>
                <li class="nav-item"><a href="#" class="nav-link">INFOS CINE</a></li>
            </ul>
        </header>
    </div>

    
    <!-- En tête -->
    <section class="py-5 text-center container">
        <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto">
                <?php
                // URL de l'API
                $url = "http://localhost:8000/app/cinema/";

                // R�cup�ration des donn�es de l'API
                $data = file_get_contents($url);
                // Traitement des donn�es
                $json = json_decode($data, true);
                $id_cinema = 1; // l'id du cinema a recuperer

                if (isset($_GET['id'])) {
                    // L'utilisateur a envoyé un paramètre "parametre" dans la requête GET
                    $id_cinema = $_GET['id'];
                }

                $cinema = null;

                foreach ($json['cinemas'] as $c) {
                    if ($c['id'] == $id_cinema) {
                        $cinema = $c;
                        break;
                    }
                }

                if ($cinema != null) {
                    echo "<h1 class=\"fw-light\"> Bienvenue au Cinema " . $cinema['name'] . "</h1>";
                    echo "<p class=\"lead text-muted\">Adresse : " . $cinema['address'] . "</p>";
                    echo "<p class=\"lead text-muted\">Ville : " . $cinema['country'] . "</p>";
                } else {
                    echo "Cinéma introuvable.";
                }
                ?>
            </div>
        </div>
    </section>

    <!-- Affiche de film -->

    <div class="album py-5 bg-light">
        <div class="container">
            <!-- Debut conteneur -->

            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3">

                

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

                    // Afficher la liste triée de tous les films
                    foreach ($movies as $movie) {
                        echo "<div class=\"col\">";
                        echo "<div class=\"card shadow-sm\">";
                        echo "<img style=\"padding: 5px\" src=\"img/Vaincre.png\">";
                        echo "<div class=\"card-body\">";
                        echo "<p class=\"card-text\"><strong style=\"text-transform: uppercase\">";
                        echo $movie->nom;
                        echo "</strong></p>";
                        echo "</br> Date de sortie : " . $movie->dateSortie . "<br>";
                        echo "</div>";
                        echo "</div>";
                        echo "</div>";
                    }
                ?>
                <!-- Fin de conteneur -->
            </div>
        </div>
    </div>

    <!-- Footer -->

    <div class="container">
        <footer class="py-3 my-4">
            <p class="text-center text-muted">&copy; 2023 NietFlix, Inc</p>
        </footer>
    </div>

</body>
</html>