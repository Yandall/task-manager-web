import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import '@github/markdown-toolbar-element';
import {
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MarksRenderer, Plugins } from '@marks-js/marks';

@Component({
  selector: 'md',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MarkdownComponent),
      multi: true,
    },
  ],
})
export class MarkdownComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  public readonly mdControl = new FormControl();
  isFocus = false;
  clickedOutside = true;
  initComponent = false;

  marks: MarksRenderer;

  valueSubscription: Subscription;

  @ViewChild('mdrenderer') mdRenderer: ElementRef;

  ngOnInit(): void {
    this.valueSubscription = this.mdControl.valueChanges.subscribe(
      (value: string) => {
        this._onChange(value);
        this._onTouched();
        if (!this.isFocus) {
          this.renderMd();
        }
      }
    );
    this.initMdRender();
  }

  ngOnDestroy(): void {
    this.valueSubscription.unsubscribe();
  }

  writeValue(value: string | null): void {
    this.mdControl.setValue(value);
    this._onChange(value);
  }

  private _onChange(value: string | null) {}
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  private _onTouched() {}
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) this.mdControl.disable();
    else this.mdControl.enable();
  }

  @HostListener('click')
  focus() {
    this.isFocus = true;
    this.clickedOutside = false;
    (this.mdRenderer?.nativeElement as Element)?.replaceChildren();
  }

  @HostListener('document:click')
  renderMd() {
    if (!this.clickedOutside) {
      this.isFocus = true;
    } else {
      const htmlNode = this.marks.render(this.mdControl.value);
      (this.mdRenderer?.nativeElement as Element)?.replaceChildren(htmlNode);
      this.isFocus = false;
    }
    this.clickedOutside = true;
  }

  initMdRender() {
    this.marks = new MarksRenderer();
    this.marks.registerRenderers(...Plugins.map((_) => new _()));
  }
}
