CREATE TABLE
    user (
        id INT(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
        nickname varchar(255) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        bio TEXT,
        banPic VARCHAR(255),
        isMJ TINYINT(1),
        avatar VARCHAR(255),
        hashedPassword VARCHAR(255) NOT NULL,
        firstConnexion TINYINT(1),
        token TEXT
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO
    user (
        nickname,
        email,
        bio,
        banPic,
        isMJ,
        avatar,
        hashedPassword,
        firstConnexion
    )
VALUES (
        "Laurent",
        "duclos.laurent@gmail.com",
        "Notes persos pour les prochaines sessions",
        "https://picsum.photos/800/300",
        0,
        "",
        "$argon2id$v=19$m=65536,t=5,p=1$yEsnwBnRhv95PCKJN073jg$jn6I4sX3ZEej0emtoOqQkzU7GwZF3ujGVMXTWoCHCMg",
        1
    ), (
        "Eric",
        "eric.raffaele@gmail.com",
        "Notes persos pour les prochaines sessions",
        "https://picsum.photos/800/300",
        1,
        "",
        "$argon2id$v=19$m=65536,t=5,p=1$yEsnwBnRhv95PCKJN073jg$jn6I4sX3ZEej0emtoOqQkzU7GwZF3ujGVMXTWoCHCMg",
        1
    ), (
        "Sylvain",
        "test3@test.com",
        "Notes persos pour les prochaines sessions",
        "https://picsum.photos/800/300",
        0,
        "",
        "$argon2id$v=19$m=65536,t=5,p=1$yEsnwBnRhv95PCKJN073jg$jn6I4sX3ZEej0emtoOqQkzU7GwZF3ujGVMXTWoCHCMg",
        1
    ), (
        "Cécile",
        "cilou3109@gmail.com",
        "Notes persos pour les prochaines sessions",
        "https://picsum.photos/800/300",
        0,
        "",
        "$argon2id$v=19$m=65536,t=5,p=1$yEsnwBnRhv95PCKJN073jg$jn6I4sX3ZEej0emtoOqQkzU7GwZF3ujGVMXTWoCHCMg",
        1
    ), (
        "Julien",
        "test5@test.com",
        "Notes persos pour les prochaines sessions",
        "https://picsum.photos/800/300",
        1,
        "",
        "$argon2id$v=19$m=65536,t=5,p=1$yEsnwBnRhv95PCKJN073jg$jn6I4sX3ZEej0emtoOqQkzU7GwZF3ujGVMXTWoCHCMg",
        1
    ), (
        "Noémie",
        "noemiegalyjamou@gmail.com",
        "Notes persos pour les prochaines sessions",
        "https://picsum.photos/800/300",
        0,
        "",
        "$argon2id$v=19$m=65536,t=5,p=1$yEsnwBnRhv95PCKJN073jg$jn6I4sX3ZEej0emtoOqQkzU7GwZF3ujGVMXTWoCHCMg",
        1
    ), (
        "Seb",
        "baas@mailo.com",
        "Notes persos pour les prochaines sessions",
        "https://picsum.photos/800/300",
        0,
        "",
        "$argon2id$v=19$m=65536,t=5,p=1$yEsnwBnRhv95PCKJN073jg$jn6I4sX3ZEej0emtoOqQkzU7GwZF3ujGVMXTWoCHCMg",
        1
    );

CREATE TABLE
    session (
        id INT(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
        dateSession VARCHAR(255) NOT NULL UNIQUE,
        duration VARCHAR(50) NOT NULL,
        localisation VARCHAR(255) NOT NULL,
        isCampaign VARCHAR(1),
        title VARCHAR(255) NOT NULL,
        user_meal VARCHAR(100),
        details_meals TEXT,
        user_apero VARCHAR(100),
        details_apero TEXT,
        user_alcool VARCHAR(100),
        details_alcool TEXT,
        user_sweets VARCHAR(100),
        details_sweets TEXT,
        user_dessert VARCHAR(100),
        details_dessert TEXT,
        user_soft VARCHAR(100),
        details_soft TEXT
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO
    session (
        dateSession,
        duration,
        localisation,
        isCampaign,
        title,
        user_meal,
        details_meals,
        user_apero,
        user_alcool,
        user_sweets,
        user_dessert,
        user_soft
    )
VALUES (
        '2023-02-04',
        "Après-midi",
        "Chez Naälia",
        "1",
        "Avancée campagne",
        "Eric",
        "Côte de boeuf au barbec",
        "Laurent",
        "Noémie",
        "Seb et Noémie",
        "Sylvain",
        "Julien"
    ), (
        '2023-02-11',
        "Après-midi et soirée",
        "Chez Hassess",
        "0",
        "Side quests, sortez les cassos",
        "laurent",
        "Confits de coincoin",
        "Eric et Cécile",
        "julien",
        "noémie",
        "seb",
        "sylvain"
    );

CREATE TABLE
    perso (
        id INT(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
        idAuthor INT(11) UNSIGNED NOT NULL,
        nickname VARCHAR(255),
        lastname VARCHAR(255),
        classe VARCHAR(255),
        background TEXT,
        avatar VARCHAR(255),
        hauts_faits TEXT,
        species VARCHAR(255),
        CONSTRAINT persoAuthor FOREIGN KEY (idAuthor) REFERENCES user (id) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO
    perso (
        nickname,
        lastname,
        classe,
        background,
        avatar,
        hauts_faits,
        idAuthor,
        species
    )
VALUES (
        "Hassess",
        NULL,
        "Occultiste",
        "Hassess est issu d'une famille ayant passé un pacte avec la créature des profondeurs il y a des générations, engageant le linéage au bon vouloir de la monstruosité. Afin de rompre cette allégence de plusieurs siècles, Hassess s'est lancé sur les routes afin de trouver un moyen d'y parvenir. Quoi qu'il lui en coûte.",
        "",
        "A rédiger",
        1,
        "demi orc"
    );
