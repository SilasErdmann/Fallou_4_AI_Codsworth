-- Eine Datenbank für die Begleiter aus Fallout 4 erstellen
CREATE DATABASE Fallout4_Companions;

-- Die Datenbank verwenden
USE Fallout4_Companions;

-- Eine Tabelle für die Charaktereigenschaften der Begleiter erstellen
CREATE TABLE Character (
    name VARCHAR(255) PRIMARY KEY NOT NULL, -- Der Name des Begleiters
    gender VARCHAR(10) NOT NULL, -- Das Geschlecht des Begleiters
    race VARCHAR(255) NOT NULL, -- Die Rasse des Begleiters
    relation_startvalue INT NOT NULL -- Der Startwert der Beziehung zum Spieler
);

-- Eine Tabelle für die Merkmale der Begleiter erstellen
CREATE TABLE Trait (
    id INT PRIMARY KEY AUTO_INCREMENT, -- Die eindeutige ID des Merkmals
    name VARCHAR(255) NOT NULL, -- Der Name des Merkmals
    kind VARCHAR(255) NOT NULL, -- Die Art des Merkmals (z.B. Fähigkeit, Persönlichkeit, etc.)
    description VARCHAR(255) NOT NULL, -- Die Beschreibung des Merkmals
    character_name VARCHAR(255)  NOT NULL, -- Der Name des Begleiters, der das Merkmal hat
    FOREIGN KEY (character_name) REFERENCES Character(name) -- Ein Fremdschlüssel, der auf die Charaktertabelle verweist
);

-- Eine Tabelle für die Erinnerungen der Begleiter erstellen
CREATE TABLE Memory (
    id INT PRIMARY KEY AUTO_INCREMENT, -- Die eindeutige ID der Erinnerung
    content TEXT NOT NULL, -- Der Inhalt der Erinnerung (z.B. Hintergrundgeschichte oder bestimmte Aktionen des Spielers)
    ingame_time datetime, -- Die Zeit im Spiel, wann die Erinnerung ausgelöst wurde
    character_name VARCHAR(255) NOT NULL, -- Der Name des Begleiters, der die Erinnerung hat
    FOREIGN KEY (character_name) REFERENCES Character(name) -- Ein Fremdschlüssel, der auf die Charaktertabelle verweist
);

-- Eine Tabelle für die Vorlieben der Begleiter erstellen
CREATE TABLE Preference (
    id INT PRIMARY KEY AUTO_INCREMENT, -- Die eindeutige ID der Vorliebe
    action VARCHAR(255) NOT NULL, -- Die Aktion des Spielers, die die Vorliebe beeinflusst (z.B. stehlen, helfen, etc.)
    effect INT NOT NULL, -- Der Effekt der Aktion auf die Vorliebe (z.B. +15 für gefallen oder -35 für gehasst)
    ingame_time datetime NOT NULL, -- Die Zeit im Spiel, wann die Aktion stattfand
    character_name VARCHAR(255)  NOT NULL, -- Der Name des Begleiters, der die Vorliebe hat
    FOREIGN KEY (character_name) REFERENCES Character(name) -- Ein Fremdschlüssel, der auf die Charaktertabelle verweist
);

-- Eine Tabelle für die Dialoge zwischen dem Spieler und den Begleitern erstellen
CREATE TABLE Dialogue (
    id INT PRIMARY KEY AUTO_INCREMENT, -- Die eindeutige ID des Dialogs
    user_input TEXT NOT NULL, -- Der Eingabetext des Spielers
    companion_answer TEXT NOT NULL, -- Der Antworttext des Begleiters
    ingame_time datetime NOT NULL, -- Die Zeit im Spiel, wann der Dialog stattfand
    character_name VARCHAR(255)  NOT NULL, -- Der Name des Begleiters, der am Dialog beteiligt war
    FOREIGN KEY (character_name) REFERENCES Character(name) -- Ein Fremdschlüssel, der auf die Charaktertabelle verweist
);

-- Eine Tabelle für die Beispiele erstellen, damit die KI sich an den Sprachstil anpassen kann
CREATE TABLE Example (
id INT PRIMARY KEY AUTO_INCREMENT, -- Die eindeutige ID des Beispiels
user_input TEXT NOT NULL, -- Der Eingabetext des Spielers
companion_answer TEXT NOT NULL, -- Der Antworttext des Begleiters
character_name VARCHAR(255)  NOT NULL, -- Der Name des Begleiters, der am Beispiel beteiligt war
 FOREIGN KEY (character_name) REFERENCES Character(name) -- Ein Fremdschlüssel, der auf die Charaktertabelle verweist
);
