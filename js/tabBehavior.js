/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

$(document).ready(function() {

  $('#tab-level1 a').click(function(e) {
    e.preventDefault();
    $(this).tab('show');
    window.location.hash = 'level1';
  });

  $('#tab-level2 a').click(function(e) {
    e.preventDefault();
    $(this).tab('show');
    window.location.hash = 'level2';
  });

  $('#tab-level3 a').click(function(e) {
    e.preventDefault();
    $(this).tab('show');
    window.location.hash = 'level3';
  });

});
