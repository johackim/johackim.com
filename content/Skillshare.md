---
datePublished: 2021-09-27T22:29
dateUpdated: 2021-09-27T22:29
permalink: telecharger-gratuitement-les-formations-de-skillshare
publish: true
---

Pour télécharger gratuitement les formations de skillshare, il existe un outil open-source.

Il s'appelle [Skillshare-DL](https://github.com/calvinhobbes23/Skillshare-DL/).

## Installation de Skillshare-DL

Pour l'installer, il vous faut avoir [[pyenv|Python en version 3.7]] et executez les commandes suivantes :

```bash
git clone https://github.com/calvinhobbes23/Skillshare-DL/
pip install -r requirements.txt
```

## Utilisation de Skillshare-DL

Pour télécharger une formation skillshare :

```bash
python dl.py <skillshare_url>
```

Toutes les vidéos seront télécharger dans le dossier `Skillshare` 😀.

## Debug (Facultatif)

Si vous rencontrez un bug lors de l'exécution de la commande, remplacer le fichier `skillshare.py` avec le code suivant :

```diff
@@ -1,5 +1,6 @@
 import requests, json, sys, re, os
 import cloudscraper
+import json
 from slugify import slugify

 class Skillshare(object):
@@ -63,35 +64,34 @@
         if not os.path.exists(base_path):
             os.makedirs(base_path)

-        for u in data['_embedded']['units']['_embedded']['units']:
-            for s in u['_embedded']['sessions']['_embedded']['sessions']:
-                video_id = None
-
-                if 'video_hashed_id' in s and s['video_hashed_id']:
-                    video_id = s['video_hashed_id'].split(':')[1]
-
-                if not video_id:
-                    raise Exception('Failed to read video ID from data')
-
-                s_title = s['title']
-
-                if self.is_unicode_string(s_title):
-                    s_title = s_title.encode('ascii', 'replace')
-
-                file_name = '{} - {}'.format(
-                    str(s['index'] + 1).zfill(2),
-                    slugify(s_title),
-                )
-
-                self.download_video(
-                    fpath='{base_path}/{session}.mp4'.format(
-                        base_path=base_path,
-                        session=file_name,
-                    ),
-                    video_id=video_id,
-                )
+        for s in data['_embedded']['sessions']['_embedded']['sessions']:
+            video_id = None

-                print('')
+            if 'video_hashed_id' in s and s['video_hashed_id']:
+                video_id = s['video_hashed_id'].split(':')[1]
+
+            if not video_id:
+                raise Exception('Failed to read video ID from data')
+
+            s_title = s['title']
+
+            if self.is_unicode_string(s_title):
+                s_title = s_title.encode('ascii', 'replace')
+
+            file_name = '{} - {}'.format(
+                str(s['index'] + 1).zfill(2),
+                slugify(s_title),
+            )
+
+            self.download_video(
+                fpath='{base_path}/{session}.mp4'.format(
+                    base_path=base_path,
+                    session=file_name,
+                ),
+                video_id=video_id,
+            )
+
+            print('')

     def fetch_course_data_by_class_id(self, class_id):
         url = 'https://api.skillshare.com/classes/{}'.format(class_id)
```

---

Références :

- [How to download Skillshare videos without Premium Account](https://reddit.com/r/Piracy/comments/la09b7/how_to_download_skillshare_videos_without_premium/)