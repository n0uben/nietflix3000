<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Page d'accueil</title>
    <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/headers/">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/headers.css" rel="stylesheet">
</head>
<body>

    <?php
        if(isset($_POST['id'])) {
          $valeur_recue = $_POST['id'];
          echo "La valeur revue est : " . $valeur_recue;

          // Construction de l'URL de redirection avec la donn�e incluse
          $url = "http://localhost/accueil.php?id=" . urlencode($valeur_recue);

          // Redirection de l'utilisateur vers l'URL sp�cifi�e
          header("Location: $url");
        }
    ?>
    <!-- Header -->
    <div class="container">
        <header class="d-flex justify-content-center py-3">
            <ul class="nav nav-pills">
                <li class="nav-item"><img src="image/logo.png" class="img-fluid mx-auto d-block" alt="Logo">
                </li>
            </ul>
        </header>
    </div>

    <div class="d-flex justify-content-center">
        <?php
        if(isset($_GET['id'])) {
            $valeur_recue = $_GET['id'];
        }
        $url = "http://localhost:8000/app/cinema/";

        // R�cup�ration des donn�es de l'API
        $data = file_get_contents($url);
        // Traitement des donn�es
        $json = json_decode($data, true);

        foreach ($json['cinemas'] as $cinema) {
            echo "<form method=\"post\" >";
            echo "<button type=\"submit\" name=\"id\" value=\"". $cinema['id'] . "\"  class=\"btn btn-primary\">" . $cinema['name'] . "</button>";
            echo "</form>";
        }

        ?>
    </div>



    <!-- Footer -->

    <div class="container">
        <footer class="py-3 my-4">
            <p class="text-center text-muted">&copy; 2023 NietFlix, Inc</p>
        </footer>
    </div>

</body>
</html>