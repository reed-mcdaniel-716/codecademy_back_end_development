-- Heaviest Hitters: team with the highest average weight of its batters on a given year

with avg_weight_per_year as (
  select teams.name as team_name, batting.yearid as game_year, avg(people.weight) as avg_weight
  from people
  inner join batting on people.playerid = batting.playerid
  inner join teams on batting.team_id = teams.id
  group by 1, 2
),

ranked as (
  select *, rank() over (partition by game_year order by avg_weight desc) as weight_rank
	from avg_weight_per_year
)

select *
from ranked
where weight_rank = 1
order by game_year desc;



-- Shortest Sluggers: team with the smallest average height of its batters on a given year

with avg_height_per_year as (
  select teams.name as team_name, batting.yearid as game_year, avg(people.height) as avg_height
  from people
  inner join batting on people.playerid = batting.playerid
  inner join teams on batting.team_id = teams.id
  group by 1, 2
),

ranked as (
  select *, rank() over (partition by game_year order by avg_height asc) as height_rank
	from avg_height_per_year
)

select *
from ranked
where height_rank = 1
order by game_year desc;

-- Biggest Spenders: team with the largest total salary of all players in a given year

with total_salaries_per_year as (
  select teams.name as team_name, batting.yearid as game_year, sum(salaries.salary) as total_salary
  from people
  inner join batting on people.playerid = batting.playerid
  inner join teams on batting.team_id = teams.id
  inner join salaries on salaries.playerid = people.playerid
  group by 1, 2
),

ranked as (
  select *, rank() over (partition by game_year order by total_salary desc) as salary_rank
	from total_salaries_per_year
)

select *
from ranked
where salary_rank = 1
order by game_year desc;

-- Most Bang For Their Buck In 2010: team that had the smallest “cost per win” in 2010

with total_salaries_2010 as (
  select teams.name as team_name, teams.w as wins, sum(salaries.salary) as total_salary
  from people
  inner join batting on people.playerid = batting.playerid
  inner join teams on batting.team_id = teams.id
  inner join salaries on salaries.playerid = people.playerid
  where batting.yearid = 2010
  group by 1, 2
)

select team_name, round(cast((total_salary/wins) as numeric), 2) as const_per_win
from total_salaries_2010;

-- Priciest Starter: the pitcher who, in a given year, cost the most money per game in which they were the starting pitcher

with starting_pitcher_cost_per_year as (
  select
  	people.namefirst,
  	people.namelast,
  	pitching.yearid as game_year,
  	sum(pitching.gs) as game_starting_pitches,
  	sum(salaries.salary) as total_salary
  from people
  inner join salaries on salaries.playerid = people.playerid
  inner join pitching on pitching.playerid = salaries.playerid and
  	pitching.yearid=salaries.yearid and
  	pitching.teamid = salaries.teamid
  group by 1, 2, 3
  having sum(pitching.gs) >= 10
),

cost_per_game as (
  select *, total_salary/game_starting_pitches as cost_per_start
  from starting_pitcher_cost_per_year
),

ranked as (
  select *, rank() over (partition by game_year order by cost_per_start desc) as cost_rank
	from cost_per_game
)

select *
from ranked
where cost_rank = 1
order by game_year desc;

-- Canadian Ace: The pitcher with the lowest ERA who played for a team whose stadium is in Canada

with canadian_pitchers as (
  select people.namefirst, people.namelast, pitching.era, teams.name, parks.parkname, parks.country
  from people
  inner join pitching on people.playerid = pitching.playerid
  inner join teams on pitching.team_id = teams.id and pitching.yearid = teams.yearid
  inner join parks on teams.park = parks.parkname
  where pitching.era is not null and parks.country = 'CA'
)

select *
from canadian_pitchers
order by era asc;