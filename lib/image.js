// Copyright (c) 2011, Mozilla Corporation
// All rights reserved.
//
// Author(s): Artur Adib <aadib@mozilla.com>
//
// You may use this file under the terms of the New BSD license as follows:
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of Mozilla Corporation nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
// ARE DISCLAIMED. IN NO EVENT SHALL MOZILLA CORPORATION BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF 
// THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

//@
//@ ## five.Image()
//@
//@ Constructor for image objects. Intended to mirror `Image()` constructor from browsers.

var qt = require('node-qt');

//
// Class Image()
// 
module.exports = function() {

  ///////////////////////////////////////////////////////////////////////////
  // Private
  //

  var image_,
      onload_,
      complete_ = false;

  ///////////////////////////////////////////////////////////////////////////
  // Public
  //

  var obj = Object.create({
    //@
    //@ #### src = 'file_name'
    //@ Presently only supports local paths, e.g. `./images/file.png`
    set src(val) {
      image_ = new qt.QImage(val);
      if (!image_.isNull()) {
        complete_ = true;
        if (onload_)
          onload_();
      } else {
        complete_ = false;
      }
    },

    //@
    //@ #### complete
    get complete() {
      return complete_;
    },

    //@
    //@ #### onload = callback
    set onload(val) {
      onload_ = val;
      if (complete_)
        onload_();
    },

    // TODO: find a better pattern to avoid leaking internals like image_
    get __image() {
      return image_;
    }
  }); // prototype

  ///////////////////////////////////////////////////////////////////////////
  // Constructor
  //

  return obj;  
}
