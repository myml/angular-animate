import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { AnimationBuilder, style, animate } from '@angular/animations';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective {
  @Input('appHover')
  backgroundImage!: string;
  @Input('timings') timings: string | number = 200;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private builder: AnimationBuilder
  ) {}

  get el() {
    return this.elRef.nativeElement;
  }
  get positions() {
    const [w, h] = [this.el.offsetWidth, this.el.offsetHeight];
    return {
      top: `0 -${h}px`,
      bottom: `0 ${h}px`,
      left: `-${w}px 0`,
      right: `${w}px 0`,
    };
  }
  getDirection([x, y, w, h]: number[]) {
    return [
      { name: 'top', value: y },
      { name: 'bottom', value: h - y },
      { name: 'left', value: x },
      { name: 'right', value: w - x },
    ].sort((a, b) => a.value - b.value)[0].name as
      | 'top'
      | 'bottom'
      | 'left'
      | 'right';
  }

  @HostListener('mouseover', ['$event']) mouseover(e: MouseEvent) {
    const direction = this.getDirection([
      e.offsetX,
      e.offsetY,
      this.el.offsetWidth,
      this.el.offsetHeight,
    ]);
    this.builder
      .build([
        style({
          backgroundImage: this.backgroundImage,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: this.positions[direction],
        }),
        animate(this.timings, style({ backgroundPosition: '0' })),
      ])
      .create(this.el)
      .play();
  }
  @HostListener('mouseout', ['$event']) mouseout(e: MouseEvent) {
    const direction = this.getDirection([
      e.offsetX,
      e.offsetY,
      this.el.offsetWidth,
      this.el.offsetHeight,
    ]);

    this.builder
      .build([
        animate(
          this.timings,
          style({ backgroundPosition: this.positions[direction] })
        ),
      ])
      .create(this.el)
      .play();
  }
}
