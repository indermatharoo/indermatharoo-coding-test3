<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

use App\User;

class UsersController extends Controller
{

   /**
    * Authenticate user.
    *
    * @return \Illuminate\Http\Response
    */
    public function authenticate(Request $request)
    {
        // defining validations
        $validator = \Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required'
        ]);

        // running validations
        if ($validator->fails()) {
            $response['success'] = false;
            $response['message'] = 'There was some errors which registeration.';
            return response($response);
        }

        $user = User::where('email', $request->input('email'))->first();// fetch user record from database

        // if there is not such user in the database return failed response.
        if(!$user) {
            $response['success'] = false;
            $response['message'] = 'Login failed.';
            return response()->json($response);
        }
        // verifing password
        if(Hash::check($request->input('password'), $user->password)){
            $apikey = base64_encode(str_random(40));
            // update api key of user
            User::where('email', $request->input('email'))->update(['api_key' => "$apikey"]);;
            $response['success'] = true;
            $response['message'] = 'logged in successfully.';
            $response['first_name'] = $user->first_name;
            $response['api_key'] = $apikey;
            // sending back success response.
            return response()->json($response);
        }
        else    
        {
            // if password does not match return failed response.
            $response['success'] = false;
            $response['message'] = 'Login failed.';
            return response()->json($response);
        }
    }

    /**
    * register user.
    *
    * @param $request \Illuminate\Http\Response
    * @return \Illuminate\Http\Response
    */
    public function register(Request $request)
    {
        // defining validations
        $validator = \Validator::make($request->all(), [
            'email' => 'unique:users',
            'first_name' => 'required',
            'last_name' => 'required',
            'gender' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        // running validations
        if ($validator->fails()) {
            $response['success'] = false;
            $response['message'] = 'There was some errors which registeration.';
            return response($response);
        }
        
        $user = new User($request->all());

        $hasher = app()->make('hash');
        $password = $hasher->make($request->input('password'));
        $user->password = $password;        
        if ($user->save()) { // save user detail into database
            $response['success'] = true;
            $response['message'] = 'User successfully registered.';
            return response()->json($response);
        }
        else{
            $response['success'] = false;
            $response['message'] = 'There was some errors which registeration.';
            return response()->json($response);
        }
    }
    
    /**
    * send user detail.
    *
    * @param $token string
    * @return \Illuminate\Http\Response
    */
    public function getUser($token) {
        $user = User::where(['api_key' => $token])->first();
        if($user)
            $user = $user->toArray();

        return response()->json($user);
    }

}    

?>