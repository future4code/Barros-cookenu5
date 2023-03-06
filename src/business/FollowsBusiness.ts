import FollowsDatabase from "../data/FollowsDatabase"
import UsersDatabase from "../data/UsersDatabase"
import CustomError from "../errors/CustomError"
import EmptyList from "../errors/EmptyList"
import MissingInfosFollowUser from "../errors/FollowsErrors/MissingInfosFollowUser"
import UserAlreadyFollowed from "../errors/FollowsErrors/UserAlreadyFollowed"
import MissingUserToFollowId from "../errors/FollowsErrors/MissingUserToFollowId"
import MissingUserToken from "../errors/UsersErrors/MissingUserToken"
import UserNotFound from "../errors/UsersErrors/UserNotFound"
import Follow from "../model/Follows/Follow"
import { FollowUserInputDTO, UnfollowUserInputDTO } from "../model/Follows/FollowsDTO"
import { TokenInputDTO } from "../model/Users/UsersDTO"
import Authenticator from "../services/Authenticator"
import IdGenerator from "../services/IdGenerator"
import MissingInfosUnfollowUser from "../errors/FollowsErrors/MissingInfosUnfollowUser copy"
import MissingUserToUnfollowId from "../errors/FollowsErrors/MissingUserToUnfollowId copy"
import UserNotFollowed from "../errors/FollowsErrors/UserNotFollowed"
import OwnUser from "../errors/FollowsErrors/OwnUser"

const followsDatabase = new FollowsDatabase()
const usersDatabase = new UsersDatabase()
const authenticatorManager = new Authenticator()
const idGenerator = new IdGenerator()

class FollowsBusiness {

    getAllFollows = async (input: TokenInputDTO): Promise<Follow[]> => {
        try {
            if(!input.token){
                throw new MissingUserToken()
            }

            const follows = await followsDatabase.getAllFollows()

            if(follows.length < 1){
                throw new EmptyList()
            }

            authenticatorManager.getTokenPayload(input.token)

            return await followsDatabase.getAllFollows()
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }        
    }

    followUser = async (input: FollowUserInputDTO): Promise<void> => {
        try {
            if(!input.token && !input.userToFollowId){
                throw new MissingInfosFollowUser()
            } if(!input.token){
                throw new MissingUserToken()
            } if(!input.userToFollowId){
                throw new MissingUserToFollowId()
            }

            const users = await usersDatabase.getAllUsers()
            const userExisting = users.filter(user => user.id === input.userToFollowId)

            const userData = await authenticatorManager.getTokenPayload(input.token)

            if(userExisting.length < 1){
                throw new UserNotFound()
            } 

            if(input.userToFollowId === userData.id){
                throw new OwnUser()
            }
            
            const follows = await followsDatabase.getAllFollows()
            const userAlreadyFollowed = follows.filter(follow => follow.user_id === userData.id && follow.followed_user === input.userToFollowId)
            
            if(userAlreadyFollowed.length > 0){
                throw new UserAlreadyFollowed()
            }            

            const newFollow = new Follow(
                idGenerator.idGenerator(), 
                userData.id,
                input.userToFollowId
            )
            
            await followsDatabase.insertFollow(newFollow)

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    unfollowUser = async (input: UnfollowUserInputDTO) => {
        try {
            if(!input.token && !input.userToUnfollowId){
                throw new MissingInfosUnfollowUser()
            } if(!input.token){
                throw new MissingUserToken()
            } if(!input.userToUnfollowId){
                throw new MissingUserToUnfollowId()
            }

            const users = await usersDatabase.getAllUsers()
            const userExisting = users.filter(user => user.id === input.userToUnfollowId)

            const userData = await authenticatorManager.getTokenPayload(input.token)

            if(userExisting.length < 1){
                throw new UserNotFound()
            } 
            
            const follows = await followsDatabase.getAllFollows()
            const userFollowed = follows.filter(follow => follow.user_id === userData.id && follow.followed_user === input.userToUnfollowId)
            
            if(userFollowed.length < 1){
                throw new UserNotFollowed()
            }          
            
            await followsDatabase.deleteFollow(input, userData)
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}

export default FollowsBusiness