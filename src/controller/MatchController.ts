import Knex from "../database/connection";
import { NextFunction, Request, Response } from "express";

class MatchController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const match = await Knex("matches").select("*");

      const serializedMatch = match.map((match) => {
        return {
          id: match.id,
          date: match.date,
          time: match.time,
          team1_id: match.team1_id,
          goals_team1: match.goals_team1,
          team2_id: match.team2_id,
          goals_team2: match.goals_team2,
          round: match.round,
          winner: match.winner,
        };
      });

      if (serializedMatch.length == 0) {
        return response.status(404).json({ message: "Not found" });
      }

      return response.json(serializedMatch);
    } catch (err) {
      next(err);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {

    try {
      const {
        team1_id,
        goals_team1,
        team2_id,
        goals_team2,
        round,
      } = request.body;


    const team1Exist = await Knex("team").where("id", team1_id);
    const team2Exist = await Knex("team").where("id", team2_id);

    if(team1_id == team2_id){
      return response.status(401).json({ error: 'a team cannot play against itself. Duplicate Id'});
    }

    if(team1Exist.length == 0){
      return response.status(401).json({ error: 'Incorrect id to meet time 1'});
    };

    if(team2Exist.length == 0){
      return response.status(401).json({ error: 'Incorrect id to meet time 2'});
    };

      //Variavel trx serve para verificar se os dois insert deram certo. Se um falhar ele não executa nenhum dos dois

      const trx = await Knex.transaction();

      var winner = 0;

      if (goals_team1 > goals_team2) {
        winner = team1_id;
      } else if (goals_team1 < goals_team2) {
        winner = team2_id;
      }

      const match = {
        team1_id,
        goals_team1,
        team2_id,
        goals_team2,
        round,
        winner: winner,
      };

      const insertedIds = await trx("matches").insert(match);

      const match_id = insertedIds[0];


      //Empate(winner == 0)

      if (winner === 0) {

        try{

        //Atualizar empate time 1  

        const team = await Knex("team").where("id", team1_id);

        const {
          name,
          score,
          ties,
          goals_difference,
          goals_for,
        } = team[0];
  
  
        var goals_different_matches_ties = goals_team2, goals_for_match_ties = goals_team1;
  
       
        var sg = (goals_for + goals_for_match_ties) - (goals_difference + goals_different_matches_ties);

        const teamUpdate = {
          score: (score + 1),
          ties: (ties + 1),
          goals_difference: (goals_difference + goals_different_matches_ties),
          goals_for: (goals_for + goals_for_match_ties),
          goals_against: sg,
        };
  
        await trx("team").update(teamUpdate).where({ id: team1_id });


        //Atualizar empate time 2  

        const team2 = await Knex("team").where("id", team2_id);

        const {
          name: name2,
          score: score2,
          ties: ties2,
          goals_difference: goals_difference2,
          goals_for: goals_for2,
        } = team2[0];
  
  
        var sg = (goals_for2 + goals_for_match_ties) - (goals_difference2 + goals_different_matches_ties);

        const team2Update = {
          score: (score2 + 1),
          ties: (ties2 + 1),
          goals_difference: (goals_difference2 + goals_different_matches_ties),
          goals_for: (goals_for2 + goals_for_match_ties),
          goals_against: sg,
        };
  
        await trx("team").update(team2Update).where({ id: team2_id });


        await trx.commit();
      
        return response.json({
          id_match: match_id,
          team1: name,
          goals_team1: goals_team1,
          team2: name2,
          goals_team2: goals_team2,
          result: "empate",
          round
        });

      }catch(err){
        next(err);
      }
   
      }

      //Ganhador

      const team = await Knex("team").where("id", winner);

      const {
        name,
        score,
        victories,
        goals_difference,
        goals_for,
      } = team[0];


      var goals_difference_match = 0, goals_for_match = 0;

      var goals_difference_match_loser = 0, goals_for_match_loser = 0;
      var teamDerroted = 0;
      
      //Se time ganhador for o time 1. O perdedor é o 2

      if(team1_id === winner){

        teamDerroted = team2_id;

        goals_difference_match = goals_team2;
        goals_for_match = goals_team1;


        goals_difference_match_loser = goals_team1;
        goals_for_match_loser = goals_team2;


      }else{

        teamDerroted = team1_id;

        goals_difference_match = goals_team1;
        goals_for_match = goals_team2;


        goals_difference_match_loser = goals_team2;
        goals_for_match_loser = goals_team1;
      }

      var sg = (goals_for + goals_for_match) - (goals_difference + goals_difference_match);

      const teamUpdate = {
        score: (score + 3),
        victories: (victories + 1),
        goals_difference: (goals_difference + goals_difference_match),
        goals_for: (goals_for + goals_for_match),
        goals_against: sg,
      };

      await trx("team").update(teamUpdate).where({ id: winner });


      //Perdedor

      const team2 = await Knex("team").where("id", teamDerroted);

      const {
        name: name_loser,
        defeats,
        goals_difference: goals_difference_loser,
        goals_for: goals_for_loser,
       
      } = team2[0];


      var sg_loser = (goals_for_loser + goals_for_match_loser) - (goals_difference_loser + goals_difference_match_loser);

      const teamUpdate2 = {
        defeats: defeats + 1,
        goals_difference: (goals_difference_loser + goals_difference_match_loser),
        goals_for: (goals_for_loser + goals_for_match_loser),
        goals_against: sg_loser,
      };

     
      await trx("team").update(teamUpdate2).where({ id: teamDerroted });

      await trx.commit();


      return response.json({
        id_match: match_id,
        winner: name,
        goals_winner: goals_for_match,
        loser: name_loser,
        goals_loser: goals_for_match_loser,
        round
      });

      
    } catch (err) {
      next(err);
    }
  }
}

export default MatchController;
