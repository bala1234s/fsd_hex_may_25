create database book_db; 
USE book_db;

create table Book (
    id INT primary key auto_increment,
    title varchar(255),
    price double,
    author varchar(255),
    publication_house varchar(100),
    category varchar(100),
    book_count INT,
    status varchar(50)
);

insert into Book (title, price, author, publication_house, category, book_count, status) values
('Warrior Code', 450.00, 'John Smith', 'Mcgraw Hill', 'WAR', 12, 'IN STOCK'),
('Fictional World', 350.00, 'Emma Rose', 'DreamFolks', 'FICTION', 10, 'IN STOCK'),
('Laugh Time', 250.00, 'Alan Grey', 'Warner Bros', 'COMEDY', 0, 'OUT_OF_STOCK'),
('Soccer Spirit', 500.00, 'Mike Star', 'Mcgraw Hill', 'SPORTS', 15, 'IN STOCK'),
('Fantasy Life', 600.00, 'Lia Blue', 'DreamFolks', 'FICTION', 5, 'OUT_OF_STOCK'),
('Battlefield Echoes', 320.00, 'Rik James', 'Warner Bros', 'WAR', 20, 'IN STOCK');


-- 1. Fetch all Books that are "IN STOCK" and price is less than given value.
DELIMITER $$;
create procedure proc_fetch_all_book_by_price(IN book_price double)
BEGIN
	select * from book where status = 'IN STOCK' AND price < 400;
END;
 CALL proc_fetch_all_book_by_price(400);
 
-- 2. Delete books that are from given publication_house. do not activate safe mode.
SET SQL_SAFE_UPDATES = 0;

DELIMITER $$
create procedure proc_delete_books_by_pub(IN pub varchar(100))
BEGIN
    delete from Book WHERE publication_house = pub;
END;
drop procedure proc_delete_books_by_pub;
CALL proc_delete_books_by_pub('DreamFolks');

-- 3. Update the price of books by given percent based on given category. do not activate safe mode. 
DELIMITER $$
create procedure proc_update_price_by_category(IN p_category varchar(100), IN p_percent double)
BEGIN
    update Book 
    SET price = price + (price * (p_percent / 100))
    WHERE category = p_category;
END;

CALL proc_update_price_by_category('FICTION', 10);

-- Trigger
DELIMITER $$
create trigger trg_book_price_check
BEFORE INSERT ON Book
FOR EACH ROW
BEGIN
    IF NEW.price > 1000 THEN
        SIGNAL SQLSTATE '45000'
        set message_text = 'Error: Price cannot exceed 1000';
    END IF;
END;


create table book_price_log (
    id INT primary key auto_increment,
    book_id INT,
    old_price double,
    new_price double,
    changed_at datetime
);

DELIMITER $$
create trigger trg_price_update_log
BEFORE UPDATE ON Book
FOR EACH ROW
BEGIN
    IF OLD.price != NEW.price THEN
        insert into book_price_log(book_id, old_price, new_price, changed_at)
        values (OLD.id, OLD.price, NEW.price, now());
    END IF;
END;

insert into Book (title, price, author, publication_house, category, book_count, status) VALUES
('Junggle Book', 2000, 'John Smith', 'Mcgraw Hill', 'WAR', 12, 'IN STOCK');
