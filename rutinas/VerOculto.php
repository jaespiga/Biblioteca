<script>
	function VerPassword() {
	  var x = document.getElementById("Clave");
	  if (x.type === "password") {
	    x.type = "text";
	  } else {
	    x.type = "password";
	  }
	}
</script>