/* globals $ */

export default function() {
  var total = 0;
  var currentNum = 0;
  var currentAction = null;
  var shouldClearTotal = true;

  var renderClearTotal = function() {
    if (shouldClearTotal) {
      return $('.calculator').addClass('clear-total');
    }

    $('.calculator').removeClass('clear-total');
  };

  var renderTotal = function() {
    $('.total').html(total.toString());

    renderClearTotal();
  };

  var renderCurrentNumber = function() {
    $('.total').html(currentNum.toString());

    renderClearTotal();
  };

  $('.number').on('click', function() {
    // If the last thing we did was Equal
    // then start fresh if a new number is clicked
    if (currentAction === 'equal') {
      total = 0;
      currentAction = null;
    }

    shouldClearTotal = false;

    // Figure out the current number that was clicked
    var clickedNum = $(this).html();

    // Add that to the shown number
    currentNum = parseInt(currentNum + clickedNum);

    // Rerender total
    renderCurrentNumber();
  });

  $('.clear').on('click', function() {
    if (shouldClearTotal) {
      total = 0;
    }

    // Always clear the current Number
    currentNum = 0;
    shouldClearTotal = true;

    renderCurrentNumber();
  });

  $('.action').on('click', function() {
    // Set the total
    switch (currentAction) {
      case 'add':
        total += currentNum;
        break;
      case 'subtract':
        total -= currentNum;
        break;
      case 'multiply':
        total *= currentNum;
        break;
      case 'divide':
        total /= currentNum;
        break;
      case null:
        total = currentNum;
    }

    // Set current action
    currentAction = $(this).data('action');

    currentNum = 0;

    if (currentAction === 'equal') {
      shouldClearTotal = true;

      return renderTotal();
    }

    // Reset currentNum

    renderCurrentNumber();
  });

  renderTotal();
}
