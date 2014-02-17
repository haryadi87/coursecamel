/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.coursecamel;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.apache.cordova.Config;
import org.apache.cordova.CordovaActivity;
import org.apache.cordova.list.*;

import android.os.Bundle;

public class CourseCamel extends CordovaActivity 
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.init();
        try 
        {
            File dbFile = getDatabasePath("coursecamel.db");
            if(!dbFile.exists()){
                this.copy("coursecamel.db",dbFile.getAbsolutePath());
            }
         } 
         catch (Exception e)
         {
         e.printStackTrace();
         }
        
        // Set by <content src="index.html" /> in config.xml
        super.loadUrl(Config.getStartUrl());
        //super.loadUrl("file:///android_asset/www/index.html")
    }
    
    //And our copy function:

    public void copy(String file, String folder) throws IOException 
     {
      File CheckDirectory;
      CheckDirectory = new File(folder);

      String parentPath = CheckDirectory.getParent();

      File filedir = new File(parentPath);
      if (!filedir.exists()) {
          if (!filedir.mkdirs()) {
              return;
          }
      }

         InputStream in = this.getApplicationContext().getAssets().open(file);
         File newfile = new File(folder);
         OutputStream out = new FileOutputStream(newfile);

         byte[] buf = new byte[1024];
         int len; while ((len = in.read(buf)) > 0) out.write(buf, 0, len);
         in.close(); out.close();
     }
}

