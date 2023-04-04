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

<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.4.1/socket.io.min.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const socket = io.connect('ws://localhost:5000');
        

        // récupérer les paramètres de l'URL
        const urlParams = new URLSearchParams(window.location.search);

        // récupérer la valeur de l'ID
        const id = urlParams.get('id');

        let nb = parseInt(id);
        // utiliser la valeur de l'ID
        console.log('La valeur de l\'ID est : ' + nb);

        // Demander les salles d'un cinéma spécifique
        const cinemaId = nb; // Remplacer par l'ID du cinéma souhaité
        socket.emit('get_cinema_by_id', { cinema_id: cinemaId });
        socket.on('cinema_info', function(data) {
            const CinemaName = document.createElement('h2');
            CinemaName.innerHTML = 'Cinema : ' + data.nom;

            const Adresse = document.createElement('h5');
            Adresse.innerHTML = 'Adresse : ' + data.adresse;

            const CodePostal = document.createElement('h5');
            CodePostal.innerHTML = 'Ville : ' + data.ville;

            const Ville = document.createElement('h5');
            Ville.innerHTML = 'Code postal : ' + data.code_postal;

            const parentElement = document.getElementById('parent-element');
            parentElement.appendChild(CinemaName);
            parentElement.appendChild(Adresse);
            parentElement.appendChild(CodePostal);
            parentElement.appendChild(Ville);

            

        });



        // Gérer les erreurs
        socket.on('error', function(data) {
            console.error('Error:', data.message);
        });


    });
</script>

    <!-- Header -->
    <div class="container">
        <header class="d-flex justify-content-center py-3">
            <ul class="nav nav-pills">
                <li class="nav-item"><img src="../film/image/logo.png" class="img-fluid mx-auto d-block" alt="Logo">
                </li>
                <li class="nav-item"><a href="http://localhost/film/index.html" class="nav-link active" aria-current="page">Accueil</a></li>
            </ul>
        </header>
    </div>

    
    <!-- En tête -->
    <section class="py-5 text-center container">
        <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto">

                <div id="parent-element"></div>

            </div>
        </div>
    </section>

    <!-- Affiche de film -->

    <div class="album py-5 bg-light">
        <div class="container">
            <!-- Debut conteneur -->

            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3">

                <?php
                    if(isset($_GET['id']))
                    {
                    $id_cinema = $_GET['id'];
                    }
                    else
                    {
                    $id_cinema = 1;
                    }

                    // Définir l'adresse de l'API GraphQL
                    $url = 'http://localhost:8081/graphql';

                    // Définir la requête GraphQL
                    $query = 'query listMovies {
                        allMovies {
                            id
                            nom
                            dateSortie
                            duree
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
                        echo "<form method=\"post\" action=\"../details/index.php?film_id=". $movie->id .  "&id=". $id_cinema  ."  \">";
                        echo "<div class=\"card shadow-sm\">";
                        echo "<img style=\"padding: 5px\" src=\"" .$movie->imageUrl . "\">";
                        echo "<div class=\"card-body\">";
                        echo "<p class=\"card-text\"><strong style=\"text-transform: uppercase\">";
                        echo $movie->nom;
                        echo "</strong></p>";
                        echo "</br> Date de sortie : " . $movie->dateSortie . "<br>";
                        echo "<button type=\"submit\">Reserver</button>";
                        echo "</form>";
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