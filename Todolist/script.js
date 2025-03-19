$(document).ready(function () {
    // Function to add a new task
    function addTask() {
        var taskText = $('#taskInput').val().trim();
        if (taskText === '') return;

        var li = $('<li></li>');
        var checkBox = $('<input type="checkbox">').on('change', function () {
            li.toggleClass('completed', checkBox.prop('checked'));
            filterTasks(); // Reapply filter after task completion status changes
        });

        var taskSpan = $('<span></span>').text(taskText);

        var removeButton = $('<button class="remove">Done</button>').on('click', function () {
            li.remove();
            filterTasks(); // Reapply filter after task removal
        });

        li.append(checkBox, taskSpan, removeButton);
        $('#list').append(li);
        $('#taskInput').val(''); // Clear the input field after adding a task
        filterTasks(); // Reapply filter to ensure the list is updated
    }

    // Add Task when "ADD" button is clicked
    $('.add').click(function () {
        addTask();
    });

    // Add Task when Enter key is pressed in the task input field
    $('#taskInput').keypress(function (e) {
        if (e.which === 13) { // 13 is the key code for Enter
            addTask();
        }
    });

    // Function to filter tasks based on the selected status
    function filterTasks() {
        var filter = $('.status .filter-btn.selected').data('filter'); // Get the selected filter

        $('#list li').each(function () {
            var $this = $(this);
            var isCompleted = $this.find('input[type="checkbox"]').prop('checked'); // Check if task is completed

            if (filter === 'all') {
                $this.show(); // Show all tasks
            } else if (filter === 'active') {
                $this.toggle(!isCompleted); // Show active tasks (not completed)
            } else if (filter === 'completed') {
                $this.toggle(isCompleted); // Show completed tasks
            }
        });
    }

    // Set up click event handlers for filtering tasks
    $('.status').on('click', '.filter-btn', function () {
        // Remove 'selected' class from all filter buttons
        $('.status .filter-btn').removeClass('selected');
        // Add 'selected' class to the clicked filter button
        $(this).addClass('selected');
        // Filter tasks based on the selected status
        filterTasks();
    });

    // Initial setup: mark 'All Tasks' as selected and display all tasks
    $('.status .filter-btn[data-filter="all"]').addClass('selected');
    filterTasks();
});
