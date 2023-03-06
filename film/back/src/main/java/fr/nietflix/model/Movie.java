package fr.nietflix.model;

import jakarta.persistence.*;

@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nom;

    @Column
    private String dateSortie;

    @Column
    private Integer duree;

    public Movie() {
    }

    public Movie(String nom, String dateSortie, Integer duree) {
        this.nom = nom;
        this.dateSortie = dateSortie;
        this.duree = duree;
    }

    public Movie(Long id, String nom, String dateSortie, Integer duree) {
        this.id = id;
        this.nom = nom;
        this.dateSortie = dateSortie;
        this.duree = duree;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDateSortie() {
        return dateSortie;
    }

    public void setDateSortie(String dateSortie) {
        this.dateSortie = dateSortie;
    }

    public Integer getDuree() {
        return duree;
    }

    public void setDuree(Integer duree) {
        this.duree = duree;
    }
}
