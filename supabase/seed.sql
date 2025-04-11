-- Add some simple users
-- insert into auth.users 
--   (id, aud, role, email, encrypted_password, instance_id, raw_app_meta_data, raw_user_meta_data, email_confirmed_at, created_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at)
-- values 
--   ('2605a7e7-78cd-4c48-a722-399be61b37fd', 'authenticated', 'authenticated', 'user@example.com',      extensions.crypt('user', extensions.gen_salt('bf')),      '00000000-0000-0000-0000-000000000000', '{"provider":"email","providers":["email"]}', '{}', timezone('utc'::text, now()), timezone('utc'::text, now())),
--   ('3b377f4d-4dde-48a0-b9e7-b2eea4324705', 'authenticated', 'authenticated', 'moderator@example.com', extensions.crypt('moderator', extensions.gen_salt('bf')), '00000000-0000-0000-0000-000000000000', '{"provider":"email","providers":["email"]}', '{}', timezone('utc'::text, now()), timezone('utc'::text, now())),
--   ('df948ea1-b196-4458-95cf-de86ddc1d4b3', 'authenticated', 'authenticated', 'admin@example.com',     extensions.crypt('admin', extensions.gen_salt('bf')),     '00000000-0000-0000-0000-000000000000', '{"provider":"email","providers":["email"]}', '{}', timezone('utc'::text, now()), timezone('utc'::text, now()));
INSERT INTO auth.users 
  (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
VALUES
  ('00000000-0000-0000-0000-000000000000', '2605a7e7-78cd-4c48-a722-399be61b37fd', 'authenticated', 'authenticated', 'user@example.com',      extensions.crypt('user', extensions.gen_salt('bf')),      '2022-10-04 03:41:27.39308+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"user_name": "user"}',      NULL, '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL),
  ('00000000-0000-0000-0000-000000000000', '3b377f4d-4dde-48a0-b9e7-b2eea4324705', 'authenticated', 'authenticated', 'moderator@example.com', extensions.crypt('moderator', extensions.gen_salt('bf')), '2022-10-04 03:41:27.39308+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"user_name": "moderator"}', NULL, '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL),
  ('00000000-0000-0000-0000-000000000000', 'df948ea1-b196-4458-95cf-de86ddc1d4b3', 'authenticated', 'authenticated', 'admin@example.com',     extensions.crypt('admin', extensions.gen_salt('bf')),     '2022-10-04 03:41:27.39308+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"user_name": "admin"}',     NULL, '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

-- test user email identities
INSERT INTO auth.identities 
  (id, provider_id,user_id, identity_data, provider, last_sign_in_at, created_at, updated_at) 
(
  select
    uuid_generate_v4 (),
    id,
    id,
    format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb,
    'email',
    current_timestamp,
    current_timestamp,
    current_timestamp
  from
    auth.users
);

-- And their permissions
insert into public.user_roles
  (id, user_id, role)
values
  (1, '3b377f4d-4dde-48a0-b9e7-b2eea4324705', 'moderator'),
  (2, 'df948ea1-b196-4458-95cf-de86ddc1d4b3', 'admin');
