INSERT INTO blogful_articles
    (title, content, date_published)
VALUES 
    ('Hello', 'My content', now()),
    ('Ok', 'here we go again', now()),
    ('If you wanna get with me', 'You gotta play mario kart', now()),
    ('Title', 'Yeah yeah', now() - '1 days'::INTERVAL),
    ('Getting tired of this', 'I dunno', now() - '1 days'::INTERVAL),
    ('Peep The Beep', 'Ok Ok Ok', now() - '3 days'::INTERVAL),
    ('There''s gotta be a way', 'to automate', now() - '4 days'::INTERVAL);
