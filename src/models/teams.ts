import { Types } from '../database'

export default interface TeamData {
    DOCUMENT_TYPE : typeof Types.Collections.team;

    teamOrg: number;
    organizationName : string;
    teamLetter : string;
    region : string;

    tournamentStats : {
        tournamentsAttended : number;
        matchWins : number;
        matchLosses : number;
        matchTies : number;
        matchWinPercentage : number;
        averagePlacement : number;
        totalAwards : number;
        averagePPG : number;
        averagePPGAgainst: number;
    }
    
    skillsStats : {
        bestDriverScore : number;
        bestProgrammingScore: number;
    }
}