(function() {
    const hamburger = document.getElementById("navHamburger");
    const drawer = document.getElementById("navDrawer");
    window.closeDrawer = function() {
        if (drawer) drawer.classList.remove("open");
        if (hamburger) hamburger.classList.remove("open");
    };
    if (hamburger && drawer) {
        hamburger.addEventListener("click", function() {
            drawer.classList.toggle("open");
            hamburger.classList.toggle("open");
        });
    }
    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: .12
        });
        revealItems.forEach(function(item) {
            observer.observe(item);
        });
    } else {
        revealItems.forEach(function(item) {
            item.classList.add("visible");
        });
    }
    const videoModal = document.getElementById("videoModal");
    const videoFrameWrap = document.getElementById("videoFrameWrap");
    const videoButtons = document.querySelectorAll("[data-youtube]");
    const closeVideoButtons = document.querySelectorAll("[data-close-video]");
    function openVideo(videoId, videoUrl) {
        if (!videoModal || !videoFrameWrap || !videoId) return;
        const safeVideoUrl = videoUrl || "https://www.youtube.com/watch?v=" + videoId;
        const embedUrl = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&rel=0&modestbranding=1&playsinline=1";
        videoFrameWrap.innerHTML = '<iframe src="' + embedUrl + '" title="Robotics video example" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' + '<div class="video-modal-actions">' + "<span>If playback is blocked by YouTube or local testing,</span>" + '<a href="' + safeVideoUrl + '" target="_blank" rel="noopener noreferrer">watch it on YouTube</a>' + "</div>";
        videoModal.classList.add("open");
        videoModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("video-modal-open");
    }
    function closeVideo() {
        if (!videoModal || !videoFrameWrap) return;
        videoModal.classList.remove("open");
        videoModal.setAttribute("aria-hidden", "true");
        videoFrameWrap.innerHTML = "";
        document.body.classList.remove("video-modal-open");
    }
    videoButtons.forEach(function(btn) {
        btn.addEventListener("click", function() {
            openVideo(btn.getAttribute("data-youtube"), btn.getAttribute("data-youtube-url"));
        });
    });
    closeVideoButtons.forEach(function(btn) {
        btn.addEventListener("click", closeVideo);
    });
    if (videoModal) {
        videoModal.addEventListener("click", function(event) {
            if (event.target === videoModal) closeVideo();
        });
    }
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") closeVideo();
    });
})();