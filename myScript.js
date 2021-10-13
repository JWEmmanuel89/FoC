
function calculateBmi() 
{
var weight = document.bmiForm.weight.value
var height = document.bmiForm.height.value

if(weight > 0 && height > 0)
{	
var finalBmi = (703*weight)/(height*height)
document.bmiForm.bmi.value = finalBmi

if(finalBmi < 18.5)
{
document.bmiForm.meaning.value = "You are too thin."
}

if(finalBmi > 18.5 && finalBmi < 25)
{
document.bmiForm.meaning.value = "You are healthy."
}

if(finalBmi > 25)
{
document.bmiForm.meaning.value = "You are overweight. Please go on a diet!"
}

}
else
{
alert("Please enter accurante information.")
}
}
