Data model: fields

Last updated: Mar 03, 2025
|
Edit this page

Here's a look at the fields on each data type. To learn more about how to think about data in PostHog, see understanding PostHog.
Event fields

Each event contains the following base fields within ClickHouse:
Column Type Description
uuid UUID ID of the event
team_id Int64 Foreign key which links to the team
event VARCHAR Name of the event
distinct_id VARCHAR The unique or anonymous ID of the user that triggered the event.
properties VARCHAR Any key: value pairs in a dict.

- $current*url - we use this in a couple of places (like /paths, /events) as the URL the user was visiting at that time.
  elements*_ Various Columns used for $autocapture to track which DOM element was clicked on
  timestamp DateTime64(6, 'UTC') Defaults to timezone.now at ingestion time if not set
  created_at DateTime64(6, 'UTC') The timestamp for when the event was ingested
  person_id UUID This is the id of the Person that sent this event
  person_created_at DateTime64(3) The timestamp of the earliest event associated with this person
  person_properties VARCHAR A JSON object with all the properties for a user, which can be altered using the $set, $set_once, and $unset arguments
  group_ Various Columns used for group analytics

Events are only stored within ClickHouse, and once they have been written they can't be changed. This limitation comes from a trade-off in the design of ClickHouse: inserting data and running queries on large tables is extremely fast, but updating or deleting specific rows is generally not efficient.
Person fields

Each person contains the following base fields within PostgreSQL:
Column Type Description
id integer Sequential ID for the person
team_id integer Foreign key which links to the team
uuid UUID UUID of the person within ClickHouse. This is referenced by the person_id field on events
created_at timestamptz The timestamp of the earliest event associated with this person
properties jsonb A JSON object with all the properties for a user, which can be altered using the $set, $set_once, and $unset arguments
version bigint Incremented every time a person is updated. Helps to keep ClickHouse and PostgreSQL in sync.

Persons are stored in PostgreSQL but are additionally replicated into ClickHouse for certain queries. For example, when viewing the global list of persons from the dashboard, this information is retrieved from ClickHouse.

Person properties are also stored directly on each event. Their value is determined during ingestion by looking up the person who sent the event in PostgreSQL and combining these values with any updates from the event itself.

The properties field on each person object can be updated at any time. As a result, the PostgreSQL table represents the one source of truth for the most up-to-date values for the properties of a person.
