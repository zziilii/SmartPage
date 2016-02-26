# SmartPage
更好用、易用的jQuery分页

##screen capture
![](https://t2onva.dm2301.livefilestore.com/y3mlkQUVHUP4BucRYJBo03Sf_TRuV8RY7kONTd5E7MCBd02RBnCEVATS0-6oFshE1Q2aJ7kgGw8X5FpFuyLXFe_lmzj-PdsGWVhzv7QvBYdfgq0Btz0b7YrQao5I3Pra1uH_QXiEXmAx7bTSD97MZnjJCMAFKLNLR644KvXBLy3p30?width=660&height=63&cropmode=none)

##Running demo
```HTML
<!DOCTYPE html>
<html>
<head>
	<title>demo</title>
</head>
<body>
	<h3>demo</h3>
	<div class="pager"></div>
</body>
<script src="./src/scripts/jquery-1.11.1.js"></script>
<script src="./src/scripts/SmartPage.js"></script>
<script type="text/javascript">
	$('.pager').smartPage({
		total: 1000
	});
</script>
</html>
```