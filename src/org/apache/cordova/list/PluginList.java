package org.apache.cordova.list;

import java.util.ArrayList;
import java.util.List;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.AlertDialog;
import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.util.Log;
import android.view.KeyEvent;


public class PluginList extends CordovaPlugin {
	public PluginList() {
		System.out.println("Create this class");
	}
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		if(action.equals("checkboxlist")) {
			this.loadCheckboxList(args, callbackContext);
		}
		else if(action.equals("radiolist")) {
			this.loadRadioList(args, callbackContext);
		}
		return true;
	}

	public void loadCheckboxList(final JSONArray thelist, final CallbackContext callbackContext) {
		final CordovaInterface cordova = this.cordova;

		Runnable runnable = new Runnable() {

			public void run() {

				List<String> list = new ArrayList<String>();

				for( int x = 0; x < thelist.length(); x++) {
					try {
						list.add( thelist.getString(x) );
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}

				CharSequence[] items = list.toArray(new CharSequence[list.size()]);
				boolean[] checkbox = new boolean[list.size()];

				AlertDialog.Builder builder = new AlertDialog.Builder(cordova.getActivity());
				builder.setTitle(" ");
				/*try {
					builder.setTitle("");
					//builder.setTitle( thelist.getString(0) );
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} // index 0 contains the title*/
				
				//builder.setMultiChoiceItems(items, checkedItems, listener);
				builder.setMultiChoiceItems(items, checkbox, new DialogInterface.OnMultiChoiceClickListener() {
					@Override
					public void onClick(DialogInterface dialog, int item, boolean isChecked) {
						// TODO Auto-generated method stub
						PluginResult result = new PluginResult(PluginResult.Status.OK, item);
						//callbackContext.sendPluginResult(result);
						//result.setKeepCallback(true);
						KeyEvent event = new KeyEvent(KeyEvent.ACTION_DOWN,KeyEvent.KEYCODE_BACK);
						if(cordova.getActivity().dispatchKeyEvent(event)) {
							Log.d("Action: ", "Checklist is selected");
							result.setKeepCallback(true);
							callbackContext.sendPluginResult(result);
							/*if(isChecked) {
								result.setKeepCallback(true);
								callbackContext.sendPluginResult(result);
							}*/
							//dialog.dismiss();
						}
						else {
							result.setKeepCallback(true);
							Log.d("tag: ", "Key event back is not pressed");
						}
					}
				});
				
				/*builder.setItems(items, new DialogInterface.OnClickListener() {
					public void onClick(DialogInterface dialog, int item) {
						dialog.dismiss();
						// we +1 to item because item starts from 0, but from
						// thelist[0], that was the title...
						callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, item + 1));                        
					}
				});*/
				AlertDialog alert = builder.create();
				alert.getWindow().getAttributes().windowAnimations = android.R.style.Animation_Dialog;
				alert.show();    
			}
		};
		this.cordova.getActivity().runOnUiThread(runnable);
	}
	
	public void loadRadioList(final JSONArray thelist, final CallbackContext callbackContext) {
		final CordovaInterface cordova = this.cordova;
		Runnable runnable = new Runnable() {
			public void run() {
				List<String> list = new ArrayList<String>();
				for( int x = 0; x < thelist.length(); x++) {
					try {
						list.add( thelist.getString(x) );
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}

				CharSequence[] items = list.toArray(new CharSequence[list.size()]);
				AlertDialog.Builder builder = new AlertDialog.Builder(cordova.getActivity());
				builder.setTitle(" ");				
				builder.setSingleChoiceItems(items, -1, new DialogInterface.OnClickListener() {
					public void onClick(DialogInterface dialog, int item) {
						PluginResult result = new PluginResult(PluginResult.Status.OK, item);
						KeyEvent event = new KeyEvent(KeyEvent.ACTION_DOWN,KeyEvent.KEYCODE_BACK);
						if(cordova.getActivity().dispatchKeyEvent(event)) {
							Log.d("Action: ", "radiolist is selected");
							result.setKeepCallback(true);
							callbackContext.sendPluginResult(result);
						}
						else {
							result.setKeepCallback(true);
							Log.d("tag: ", "Key event back is not pressed");
						}                       
					}
				});
				AlertDialog alert = builder.create();
				alert.getWindow().getAttributes().windowAnimations = android.R.style.Animation_Dialog;
				alert.show();    
			}
		};
		this.cordova.getActivity().runOnUiThread(runnable);
	}
}