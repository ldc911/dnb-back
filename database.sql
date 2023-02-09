CREATE TABLE
    user (
        id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
        nickname varchar(255) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        bio TEXT,
        banPic VARCHAR(255),
        isMJ TINYINT(1),
        avatar VARCHAR(255),
        hashedPassword VARCHAR(255) NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO
    user (
        nickname,
        email,
        bio,
        banPic,
        isMJ,
        avatar,
        hashedPassword
    )
VALUES (
        "Hassess",
        "test@test.com",
        "Parcours d'Hassess,occultiste de niveau 5",
        "https://picsum.photos/800/300",
        0,
        "",
        "$argon2id$v=19$m=65536,t=5,p=1$yEsnwBnRhv95PCKJN073jg$jn6I4sX3ZEej0emtoOqQkzU7GwZF3ujGVMXTWoCHCMg"
    ), (
        "Naälia et Tagadours",
        "test2@test.com",
        "Parcours d'une drakédie et d'une féral, magelame et ensorceleuse de niveau 5",
        "https://picsum.photos/800/300",
        1,
        "",
        "$argon2id$v=19$m=65536,t=5,p=1$yEsnwBnRhv95PCKJN073jg$jn6I4sX3ZEej0emtoOqQkzU7GwZF3ujGVMXTWoCHCMg"
    ), (
        "Grodar",
        "test3@test.com",
        "Parcours de Grodar, barbare de niveau 5",
        "https://picsum.photos/800/300",
        0,
        "",
        "$argon2id$v=19$m=65536,t=5,p=1$yEsnwBnRhv95PCKJN073jg$jn6I4sX3ZEej0emtoOqQkzU7GwZF3ujGVMXTWoCHCMg"
    ), (
        "Kaz et Smaja",
        "test4@test.com",
        "Parcours de Kaz et Smaja, assassin et prétresse de niveau 5",
        "https://picsum.photos/800/300",
        0,
        "",
        "$argon2id$v=19$m=65536,t=5,p=1$yEsnwBnRhv95PCKJN073jg$jn6I4sX3ZEej0emtoOqQkzU7GwZF3ujGVMXTWoCHCMg"
    ), (
        "Divin",
        "test5@test.com",
        "Parcours de Divin, forgelier de niveau 5",
        "https://picsum.photos/800/300",
        1,
        "",
        "$argon2id$v=19$m=65536,t=5,p=1$yEsnwBnRhv95PCKJN073jg$jn6I4sX3ZEej0emtoOqQkzU7GwZF3ujGVMXTWoCHCMg"
    );

CREATE TABLE
    session (
        id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
        dateSession VARCHAR(255) NOT NULL UNIQUE,
        duration VARCHAR(50) NOT NULL,
        localisation VARCHAR(255) NOT NULL,
        isCampaign VARCHAR(1),
        title VARCHAR(255) NOT NULL,
        user_meal INT,
        details_meals TEXT,
        user_apero INT,
        user_alcool INT,
        user_sweets INT,
        user_dessert INT,
        user_soft INT
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
        2,
        "Côte de boeuf au barbec",
        1,
        4,
        3,
        3,
        5
    ), (
        '2023-02-11',
        "Après-midi et soirée",
        "Chez Hassess",
        "0",
        "Side quests, sortez les cassos",
        1,
        "Confits de coincoin",
        2,
        4,
        3,
        5,
        3
    );