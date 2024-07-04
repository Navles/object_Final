package com.sample;

import android.content.Intent;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class HelloModule extends ReactContextBaseJavaModule {

    private static final String TAG = "HelloModule";


    private static ReactApplicationContext reactContext;
    public static HelloModule instance;

    HelloModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        instance = this;
    }

    @Override
    public String getName() {
        return "HelloModule";
    }

    @ReactMethod
    public void navigateToNative() {
        Intent intent = new Intent(reactContext, YoloModule.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactContext.startActivity(intent);
    }

    @ReactMethod
    public void triggerEvent(String message) {
        WritableMap params = new WritableNativeMap();
        params.putString("message", message);
        sendEvent(reactContext, "eventKey", params);
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

}
