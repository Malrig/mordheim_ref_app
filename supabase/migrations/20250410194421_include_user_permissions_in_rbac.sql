-- Create the auth hook function
create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
as $$
  declare
    claims jsonb;
    user_role public.app_role;
    user_permissions text[];
  begin
    -- Fetch the user role in the user_roles table
    select role into user_role from public.user_roles where user_id = (event->>'user_id')::uuid;
    user_permissions := array(select permission from public.role_permissions where role = user_role);
    claims := event->'claims';
    if user_role is not null then
      -- Set the claim
      claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
    else
      claims := jsonb_set(claims, '{user_role}', 'null');
    end if;
    if array_length(user_permissions, 1) > 0 then
      -- Set the claim
      claims := jsonb_set(claims, '{permissions}', to_jsonb(user_permissions));
    else
      claims := jsonb_set(claims, '{permissions}', '[]');
    end if;
    -- Update the 'claims' object in the original event
    event := jsonb_set(event, '{claims}', claims);
    -- Return the modified or original event
    return event;
  end;
$$;
grant execute
  on function public.custom_access_token_hook
  to supabase_auth_admin;

grant all
  on table public.role_permissions
to supabase_auth_admin;
revoke all
  on table public.role_permissions
  from authenticated, anon, public;
create policy "Allow auth admin to read user permissions" ON public.role_permissions
as permissive for select
to supabase_auth_admin
