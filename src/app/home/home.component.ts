import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private originalTexts = new Map<EventTarget, string>();
  currentImageIndex = 0;
  intervalId: any;

  levels = ['Trainee', 'Júnior', 'Pleno', 'Sênior'];
  currentLevel = '';

  isMobile = window.innerWidth < 768;

  images = [
    '../../assets/cursoAngular.jpg',
    '../../assets/cursoGithub.jpeg',
    '../../assets/cursoPhp.jpg',
  ];

  ngOnInit() {
    this.scrambleAll();
    this.startCarousel();
  }

  updateCarousel(index: number) {
    this.currentImageIndex = index;
    const carousel = document.querySelector('.carousel') as HTMLElement;
    carousel.style.transform = `translateX(-${this.currentImageIndex * 100}%)`;
    this.restartCarouselInterval();
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.images.length;
      this.updateCarousel(this.currentImageIndex);
    }, 3000);
  }

  restartCarouselInterval() {
    clearInterval(this.intervalId);
    this.startCarousel();
  }

  private scrambleAll() {
    const elements = document.querySelectorAll(
      '.option, .titleBiography, .linkContact, .titleProjects'
    );

    elements.forEach((element) => {
      this.scrambleTextOnInit(element as HTMLElement);
    });
  }

  private scrambleTextOnInit(element: HTMLElement) {
    if (!this.originalTexts.has(element)) {
      this.originalTexts.set(element, element.textContent || '');
    }
    const originalText = this.originalTexts.get(element) || '';
    const scrambleDuration = 800;
    const endScramble = Date.now() + scrambleDuration;

    const scramble = () => {
      if (Date.now() >= endScramble) {
        element.textContent = originalText;
        return;
      }
      element.textContent = originalText
        .split('')
        .map((char) => (Math.random() < 0.5 ? this.randomChar() : char))
        .join('');
      requestAnimationFrame(scramble);
    };
    scramble();
  }

  goToGithub() {
    window.open('https://github.com/vinirlmarques', '_blank');
  }

  goToCurriculum() {
    window.open(
      'https://drive.google.com/file/d/1Ou9mL5sINeAapxTYrKksifAJ2SAtkXO7/view?usp=sharing',
      '_blank'
    );
  }

  scrambleText(event: MouseEvent): void {
    const element = event.target as HTMLElement;
    if (!this.originalTexts.has(element)) {
      this.originalTexts.set(element, element.textContent || '');
    }
    const originalText = this.originalTexts.get(element) || '';
    const scrambleDuration = 200;
    const endScramble = Date.now() + scrambleDuration;

    const scramble = () => {
      if (Date.now() >= endScramble) {
        element.textContent = originalText;
        return;
      }
      element.textContent = originalText
        .split('')
        .map((char) => (Math.random() < 0.5 ? this.randomChar() : char))
        .join('');
      requestAnimationFrame(scramble);
    };
    scramble();
  }

  restoreText(event: MouseEvent): void {
    const element = event.target as HTMLElement;
    if (this.originalTexts.has(element)) {
      element.textContent = this.originalTexts.get(element) ?? '';
    }
  }

  private randomChar(): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return chars.charAt(Math.floor(Math.random() * chars.length));
  }

  showTooltip(level: string): void {
    this.currentLevel = level;
  }

  hideTooltip(): void {
    this.currentLevel = '';
  }
}
