
# Mes petits sons (version corrigée)

## Structure
```
index.html
styles.css
script.js
sounds.json
sounds/ (ajoute tes fichiers ici)
```

## Ajouter des sons
1. Mets tes fichiers audio dans `sounds/`.
2. Édite `sounds.json` pour ajouter une entrée par son:
```json
[
  { "title": "Mon Son", "file": "sounds/mon_son.mp3" }
]
```
3. Commit → GitHub Pages met à jour automatiquement.

## Déploiement
- Settings → Pages → Source: main, Folder: /root.
- URL: https://<utilisateur>.github.io/<repo>/
