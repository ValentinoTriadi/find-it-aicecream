-- CREATE OR REPLACE FUNCTION create_public_user()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   INSERT INTO public.users (id, nama)
--   VALUES (NEW.id, '');
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

CREATE TRIGGER on_auth_users_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_public_user();