package com.ehdaapp;

import android.app.Application;
import android.content.res.Configuration;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.airbnb.android.react.maps.MapsPackage;

import com.oblador.vectoricons.VectorIconsPackage;
import cl.json.RNSharePackage;
import cl.json.ShareApplication;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;

public class MainApplication extends Application implements ReactApplication, ShareApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new FilePackage(),
                    new VectorIconsPackage(),
                    new RNSharePackage(),
                    new MapsPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };
    @Override
    public String getFileProviderAuthority() {
        return "com.ehdaapp.provider";
    }
    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }


    @Override
    public void onCreate() {
        super.onCreate();


        SoLoader.init(this, /* native exopackage */ false);
    }
}
