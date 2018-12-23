import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { SearchResult } from '../../../+search-page/search-result.model';
import { DSpaceObject } from '../../../core/shared/dspace-object.model';
import { ListableObject } from '../../object-collection/shared/listable-object.model';
import { AbstractListableElementComponent } from '../../object-collection/shared/object-collection-element/abstract-listable-element.component';
import { TruncatableService } from '../../truncatable/truncatable.service';
import { Metadata } from '../../../core/shared/metadata.model';

@Component({
  selector: 'ds-search-result-list-element',
  template: ``
})

export class SearchResultListElementComponent<T extends SearchResult<K>, K extends DSpaceObject> extends AbstractListableElementComponent<T> {
  dso: K;

  public constructor(@Inject('objectElementProvider') public listable: ListableObject, private truncatableService: TruncatableService) {
    super(listable);
    this.dso = this.object.dspaceObject;
  }

  /** Gets all matching metadata string values from hitHighlights or dso metadata, preferring hitHighlights. */
  allMetadataValues(keyOrKeys: string | string[]): string[] {
    return Metadata.allValues([this.object.hitHighlights, this.dso.metadata], keyOrKeys);
  }

  /** Gets the first matching metadata string value from hitHighlights or dso metadata, preferring hitHighlights. */
  firstMetadataValue(keyOrKeys: string | string[]): string {
    return Metadata.firstValue([this.object.hitHighlights, this.dso.metadata], keyOrKeys);
  }

  isCollapsed(): Observable<boolean> {
    return this.truncatableService.isCollapsed(this.dso.id);
  }
}
