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

-- Biggest Spenders: team with the largest total salary of all players in a given year

-- Most Bang For Their Buck In 2010: team that had the smallest “cost per win” in 2010

-- Priciest Starter: the pitcher who, in a given year, cost the most money per game in which they were the starting pitcher

-- Canadian Ace: The pitcher with the lowest ERA who played for a team whose stadium is in Canada