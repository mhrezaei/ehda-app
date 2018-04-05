package com.ehdaapp;

import android.content.res.Configuration;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;
import android.view.View;

import com.facebook.react.ReactActivity;

import java.util.Locale;

public class MainActivity extends ReactActivity {

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
        super.onCreate(savedInstanceState, persistentState);


        getWindow().getDecorView().setLayoutDirection(View.LAYOUT_DIRECTION_RTL);

        Configuration configuration = getResources().getConfiguration();
        configuration.setLayoutDirection(new Locale("fa"));
        getResources().updateConfiguration(configuration, getResources().getDisplayMetrics());


    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */


    @Override
    protected String getMainComponentName() {
        return "EhdaApp";
    }
}
