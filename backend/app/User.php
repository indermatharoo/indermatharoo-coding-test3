<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;


class User extends Model implements Authenticatable    {

   use AuthenticableTrait;

   protected $fillable = ['first_name','email','password','last_name','address','gender','age','blood_group','services'];

   protected $hidden = [
    'password'
   ];

}