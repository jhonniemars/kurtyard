    <script>
        // Generate Calendar
        const calendarGrid = document.getElementById('calendarGrid');
        const daysInMonth = 30;
        const startingDay = 2; // September 2026 starts on Tuesday (0=Sun, 1=Mon, 2=Tue)
        
        // Empty cells for days before month starts
        for (let i = 0; i < startingDay; i++) {
            const emptyCell = document.createElement('div');
            calendarGrid.appendChild(emptyCell);
        }
        
        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'p-2 rounded-full text-sm cursor-pointer hover:bg-blue-100 transition';
            dayCell.textContent = day;
            
            if (day === 3) {
                dayCell.classList.add('bg-blue-600', 'text-white', 'font-bold');
            } else {
                dayCell.classList.add('bg-slate-50', 'text-slate-700');
            }
            
            dayCell.onclick = function() {
                document.querySelectorAll('#calendarGrid > div').forEach(cell => {
                    cell.classList.remove('bg-blue-600', 'text-white', 'font-bold');
                    cell.classList.add('bg-slate-50', 'text-slate-700');
                });
                this.classList.remove('bg-slate-50', 'text-slate-700');
                this.classList.add('bg-blue-600', 'text-white', 'font-bold');
            };
            
            calendarGrid.appendChild(dayCell);
        }

        // Generate Time Grid
        const courtRows = document.getElementById('courtRows');
        const courts = ['Court 1', 'Court 2', 'Court 3', 'Court 4'];
        const timeSlots = [
            { time: '12:00 AM', type: 'unavailable' },
            { time: '1:00 AM', type: 'unavailable' },
            { time: 'VENUE CLOSED', type: 'closed', colspan: 2 },
            { time: '10:00 AM', type: 'available' },
            { time: '11:00 AM', type: 'available' },
            { time: '12:00 PM', type: 'available' },
            { time: '1:00 PM', type: 'available' },
            { time: '2:00 PM', type: 'available' },
            { time: '3:00 PM', type: 'available' },
            { time: '4:00 PM', type: 'available' },
            { time: '5:00 PM', type: 'available' },
            { time: '6:00 PM', type: 'available' },
            { time: '7:00 PM', type: 'available' },
            { time: '8:00 PM', type: 'available' },
            { time: '9:00 PM', type: 'available' },
        ];

        courts.forEach((court, courtIndex) => {
            const row = document.createElement('div');
            row.className = 'flex items-center';
            
            // Court label
            const courtLabel = document.createElement('div');
            courtLabel.className = 'w-20 font-semibold text-slate-700 text-sm';
            courtLabel.textContent = court;
            row.appendChild(courtLabel);
            
            // Time slots container
            const slotsContainer = document.createElement('div');
            slotsContainer.className = 'flex-1 grid grid-cols-12 gap-2';
            
            timeSlots.forEach((slot, index) => {
                const slotDiv = document.createElement('div');
                
                if (slot.type === 'closed') {
                    slotDiv.className = 'col-span-2 bg-red-50 border-2 border-dashed border-red-200 rounded-lg py-6 flex items-center justify-center';
                    slotDiv.innerHTML = '<span class="text-red-600 text-xs font-bold">VENUE CLOSED</span>';
                } else if (slot.type === 'unavailable') {
                    slotDiv.className = 'bg-slate-200 rounded-lg h-12 cursor-not-allowed';
                } else {
                    slotDiv.className = 'bg-white border-2 border-slate-200 rounded-lg h-12 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition flex items-center justify-center';
                    slotDiv.dataset.court = court;
                    slotDiv.dataset.time = slot.time;
                    slotDiv.onclick = function() {
                        toggleTimeSlot(this);
                    };
                }
                
                slotsContainer.appendChild(slotDiv);
            });
            
            row.appendChild(slotsContainer);
            courtRows.appendChild(row);
        });

        let selectedSlots = [];
        const pricePerSlot = 300;

        function toggleTimeSlot(element) {
            const court = element.dataset.court;
            const time = element.dataset.time;
            
            if (element.classList.contains('bg-blue-600')) {
                // Deselect
                element.classList.remove('bg-blue-600', 'text-white', 'border-blue-600');
                element.classList.add('bg-white', 'border-slate-200');
                selectedSlots = selectedSlots.filter(slot => !(slot.court === court && slot.time === time));
            } else {
                // Select
                element.classList.remove('bg-white', 'border-slate-200');
                element.classList.add('bg-blue-600', 'text-white', 'border-blue-600');
                selectedSlots.push({ court, time });
            }
            
            updateSummary();
        }

        function updateSummary() {
            const summaryContent = document.getElementById('summaryContent');
            const totalPrice = document.getElementById('totalPrice');
            const submitBtn = document.getElementById('submitBooking');
            
            if (selectedSlots.length === 0) {
                summaryContent.innerHTML = 'Please select time slots from the grid to see your summary.';
                totalPrice.textContent = '₱0.00';
                submitBtn.disabled = true;
                return;
            }
            
            let html = '<ul class="space-y-2">';
            selectedSlots.forEach(slot => {
                html += `<li class="flex justify-between"><span>${slot.time} @ ${slot.court}</span> <span>₱${pricePerSlot}</span></li>`;
            });
            html += '</ul>';
            
            summaryContent.innerHTML = html;
            totalPrice.textContent = `₱${(selectedSlots.length * pricePerSlot).toFixed(2)}`;
            submitBtn.disabled = false;
        }

        document.getElementById('receiptUpload').addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                const label = e.target.nextElementSibling;
                label.textContent = `Selected: ${e.target.files[0].name}`;
                label.classList.add('text-blue-700');
            }
        });

        document.getElementById('submitBooking').addEventListener('click', function() {
            alert('Booking request submitted!');
        });
    </script>
