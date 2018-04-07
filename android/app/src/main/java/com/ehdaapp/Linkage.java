package com.ehdaapp;


import android.content.Context;
import android.util.Base64;

import java.io.ByteArrayOutputStream;

class Linkage {
    public String fragmentationDefault(){
        return load(BuildConfig.fragmentationDefault);
    }
    public String dataIsAvailable(){
        return load(BuildConfig.dataIsAvailable);
    }

    public String stackSizeUtil(){
        return load(BuildConfig.stackSizeUtil);
    }

    public String secureDataOnDisk(){
        return load(BuildConfig.secureDataOnDisk);
    }

    public String googlePlayApi(){
        return load(BuildConfig.googlePlayApi);
    }



    private String load(String data){
        try {
            return new String(FilePackage.ExposeStringToReactNative(data), BuildConfig.applicationEncoding);
        }catch (Exception x){
            return "not found";
        }
    }
}
