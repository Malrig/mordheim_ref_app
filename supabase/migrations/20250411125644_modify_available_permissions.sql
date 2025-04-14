alter type "public"."app_permission" rename to "app_permission__old_version_to_be_dropped";

create type "public"."app_permission" as enum ('data-store.update', 'data-store.delete');

alter table "public"."role_permissions" alter column permission type "public"."app_permission" using permission::text::"public"."app_permission";

drop type "public"."app_permission__old_version_to_be_dropped";
